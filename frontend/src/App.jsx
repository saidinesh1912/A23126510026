import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJnaWRpdHVyaWF2c3NhaWRpbmVzaC4yMy5jc2VAYW5pdHMuZWR1LmluIiwiZXhwIjoxNzgyMjAyNDIxLCJpYXQiOjE3ODIyMDE1MjEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI5MDM5NzFkYy04ZTMwLTQwODgtYmIwNi1lMmM3MTBhZTM4OWMiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnIGEgdiBzIHNhaSBkaW5lc2giLCJzdWIiOiI1NTIyYmJhNC0wMzkyLTQxMmEtYTU4MS1jNWNiYTA3MjcwOTUifSwiZW1haWwiOiJnaWRpdHVyaWF2c3NhaWRpbmVzaC4yMy5jc2VAYW5pdHMuZWR1LmluIiwibmFtZSI6ImcgYSB2IHMgc2FpIGRpbmVzaCIsInJvbGxObyI6ImEyMzEyNjUxMDAyNiIsImFjY2Vzc0NvZGUiOiJNVHF4YXIiLCJjbGllbnRJRCI6IjU1MjJiYmE0LTAzOTItNDEyYS1hNTgxLWM1Y2JhMDcyNzA5NSIsImNsaWVudFNlY3JldCI6ImpjZ2pGUFBRd2RtVXZGQ2UifQ.NgbYqZHWY4MxlDxAVX-aNwl5M33YyfgPXLbBSYUCtyk";

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      console.log(response.data);

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markViewed = (id) => {
    const viewed =
      JSON.parse(
        localStorage.getItem("viewed")
      ) || [];

    if (!viewed.includes(id)) {
      viewed.push(id);

      localStorage.setItem(
        "viewed",
        JSON.stringify(viewed)
      );
    }

    window.location.reload();
  };

  const viewed =
    JSON.parse(
      localStorage.getItem("viewed")
    ) || [];

  const filteredNotifications =
    filter === ""
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.Type === filter
        );

  const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const priorityNotifications = [
    ...notifications,
  ]
    .sort(
      (a, b) =>
        (weights[b.Type] || 0) -
        (weights[a.Type] || 0)
    )
    .slice(0, 10);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        gutterBottom
      >
        Notification Dashboard
      </Typography>

      <Typography
        variant="h6"
        sx={{ mb: 2 }}
      >
        Filter Notifications
      </Typography>

      <Select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        sx={{
          minWidth: 220,
          mb: 4,
        }}
      >
        <MenuItem value="">
          All
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>
      </Select>

      <Typography sx={{ mb: 2 }}>
        Current Filter: {filter || "All"}
      </Typography>

      <Typography
        variant="h4"
        gutterBottom
      >
        All Notifications
      </Typography>

      {filteredNotifications.map(
        (notification) => (
          <Card
            key={notification.ID}
            sx={{ mb: 2 }}
          >
            <CardContent>

              <Chip
                label={
                  notification.Type
                }
                sx={{ mb: 1 }}
              />

              <Typography
                variant="h6"
              >
                {
                  notification.Message
                }
              </Typography>

              <Typography>
                ID: {notification.ID}
              </Typography>

              <Typography>
                Timestamp:
                {" "}
                {
                  notification.Timestamp
                }
              </Typography>

              <Typography>
                Viewed:
                {" "}
                {viewed.includes(
                  notification.ID
                )
                  ? "Yes"
                  : "No"}
              </Typography>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() =>
                  markViewed(
                    notification.ID
                  )
                }
              >
                Mark Viewed
              </Button>

            </CardContent>
          </Card>
        )
      )}

      <Typography
        variant="h4"
        sx={{
          mt: 5,
          mb: 2,
        }}
      >
        Top Priority Notifications
      </Typography>

      {priorityNotifications.map(
        (notification) => (
          <Card
            key={`priority-${notification.ID}`}
            sx={{ mb: 2 }}
          >
            <CardContent>

              <Chip
                color="primary"
                label={
                  notification.Type
                }
                sx={{ mb: 1 }}
              />

              <Typography
                variant="h6"
              >
                {
                  notification.Message
                }
              </Typography>

              <Typography>
                Priority Weight:
                {" "}
                {
                  weights[
                    notification.Type
                  ] || 0
                }
              </Typography>

            </CardContent>
          </Card>
        )
      )}
    </Container>
  );
}

export default App;
