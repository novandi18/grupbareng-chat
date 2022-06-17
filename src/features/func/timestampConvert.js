export const timestampDate = (seconds) => {
  if (seconds === null) return;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date(seconds * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let result = months[month] + " " + day + ", " + year;
  return result;
};

export const timestampTime = (seconds) => {
  if (seconds === null) return;

  let unix_timestamp = seconds;
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime =
    hours + ":" + (minutes.length >= 3 ? minutes.substring(1) : minutes);
  return formattedTime;
};

export const messageDate = (seconds) => {
  if (seconds === null || typeof seconds !== "number") return;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentYear = new Date().getFullYear();
  let currentDay = new Date().getDate();

  let date = new Date(seconds * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let result =
    currentDay === day
      ? "Today"
      : months[month] + " " + day + (year !== currentYear ? ", " + year : "");
  return result;
};
