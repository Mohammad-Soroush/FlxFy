import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Hook برای گرفتن اطلاعات Active Task کاربر
 * @param {string} endpoint آدرس API
 * @param {boolean} enabled آیا hook فعال باشد یا خیر
 */
export default function useActiveTask({ endpoint, enabled = true }) {
  const [activeTask, setActiveTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !endpoint) return;

    const source = axios.CancelToken.source();

    const fetchActiveTask = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          cancelToken: source.token,
        });

        const userBookings = res.data.data || [];
        const active = userBookings.find(
          (b) => b.status === "Booked" || b.status === "finalInvoice"
        );

        if (active) {
          setActiveTask({
            ...active,
            tasker: active.technician,
            schedule: {
              date: active.scheduled_time.split(" ")[0],
              time: active.scheduled_time.split(" ")[1],
              location: active.address,
            },
            status: active.status,
          });
        } else {
          setActiveTask(null);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          setActiveTask(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTask();

    return () => source.cancel("Operation canceled by the user.");
  }, [endpoint, enabled]);

  return { activeTask, loading, error };
}
