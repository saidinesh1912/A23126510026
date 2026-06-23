import { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/notifications"
      );

      setNotifications(
        response.data.notifications || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/notifications/${id}/read`
      );

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

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/notifications/${id}`
      );

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotifications =
    filter === ""
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.type === filter
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
        weights[b.type] -
        weights[a.type]
    )
    .slice(0, 10);

  const viewed =
    JSON.parse(
      localStorage.getItem("viewed")
    ) || [];

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
        Current Filter:
        {" "}
        {filter || "All"}
      </Typography>

      <Typography
        variant="h4"
        gutterBottom
      >
        All Notifications
      </Typography>

      {filteredNotifications.length === 0 ? (
        <Typography>
          No notifications found.
        </Typography>
      ) : (
        filteredNotifications.map(
          (notification) => (
            <Card
              key={notification.id}
              sx={{ mb: 2 }}
            >
              <CardContent>

                <Chip
                  label={
                    notification.type
                  }
                  sx={{ mb: 1 }}
                />

                <Typography
                  variant="h6"
                >
                  {
                    notification.message
                  }
                </Typography>

                <Typography>
                  ID:
                  {" "}
                  {notification.id}
                </Typography>

                <Typography>
                  Timestamp:
                  {" "}
                  {notification.timestamp}
                </Typography>

                <Typography>
                  Status:
                  {" "}
                  {notification.isRead
                    ? "Read"
                    : "Unread"}
                </Typography>

                <Typography>
                  Viewed:
                  {" "}
                  {viewed.includes(
                    notification.id
                  )
                    ? "Yes"
                    : "No"}
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mr: 2,
                  }}
                  onClick={() =>
                    markRead(
                      notification.id
                    )
                  }
                >
                  Mark Read
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() =>
                    deleteNotification(
                      notification.id
                    )
                  }
                >
                  Delete
                </Button>

              </CardContent>
            </Card>
          )
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
            key={`priority-${notification.id}`}
            sx={{ mb: 2 }}
          >
            <CardContent>

              <Chip
                color="primary"
                label={
                  notification.type
                }
                sx={{ mb: 1 }}
              />

              <Typography
                variant="h6"
              >
                {
                  notification.message
                }
              </Typography>

              <Typography>
                Priority Weight:
                {" "}
                {
                  weights[
                    notification.type
                  ]
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