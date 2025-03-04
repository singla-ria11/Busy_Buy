// 

export function formatDate(date) {
    const completeDate = new Date(date);

    const time = completeDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const onlyDate = completeDate.toISOString().split("T")[0];
    // console.log(onlyDate + " " + time);

    return onlyDate + " " + time;
  }