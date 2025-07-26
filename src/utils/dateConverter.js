export function formatDateTime(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${day} ${month} ${year} | Time : ${hours}:${minutes} ${ampm}`;
}

export function calculateDays(entryDate, exitDate) {
    const entry = new Date(entryDate);
    const exit = new Date(exitDate);

    // Calculate the difference in milliseconds
    const differenceInTime = exit - entry;

    // If entry and exit date are the same, return 1
    if (entry.toDateString() === exit.toDateString()) {
        return 1;
    }

    // Convert milliseconds to full days and add 2 to include both entry and exit dates
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)) + 2;

    return differenceInDays;
}

export function formatDateNew(dateStr) {
    // Example usage:
    // console.log(formatDate("10/02/2025 14:00:41")); // Output: "10-02-2025 2:00 pm"
    const months = {
        "01": "January", "02": "February", "03": "March", "04": "April",
        "05": "May", "06": "June", "07": "July", "08": "August",
        "09": "September", "10": "October", "11": "November", "12": "December"
    };

    let [date, time] = dateStr.split(" ");
    let [day, month, year] = date.split("/");
    let [hour, minute] = time.split(":");

    let period = +hour >= 12 ? "pm" : "am";
    hour = (+hour % 12) || 12; // Convert to 12-hour format

    return `${day}-${month}-${year} ${hour}:${minute} ${period}`;
}

export function formatDateNewRev(dateStr) {
    // Example usage:
    // console.log(formatDate("2025-02-11 15:19:00")); // Output: "11-02-2025 03:19 pm"
    let [date, time] = dateStr.split(" ");
    let [year, month, day] = date.split("-");
    let [hour, minute] = time.split(":");

    let period = +hour >= 12 ? "pm" : "am";
    hour = (+hour % 12) || 12; // Convert to 12-hour format

    return `${day}-${month}-${year} ${hour}:${minute} ${period}`;
}

export function formatDateNewRevNew(dateStr) {
    // Example usage:
    // console.log(formatDate("2025-03-28 12:36")); // Output: "11-02-2025 03:19 pm"
    if (!dateStr) return "Invalid Date";

    let [date, time] = dateStr.split(" ") || [];
    let [year, month, day] = date?.split("-") || [];
    let [hour, minute] = time?.split(":") || [];

    if (!year || !month || !day || !hour || !minute) return "Invalid Date";

    let hourNum = parseInt(hour, 10);
    let period = hourNum >= 12 ? "pm" : "am";
    hourNum = hourNum % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${day}-${month}-${year} ${hourNum}:${minute.padStart(2, "0")} ${period}`;
}

export function formatDateFromTimeStamp(input) {
    if (!input) return "Invalid Date";

    let date;
    if (typeof input === "string" || typeof input === "number") {
        date = new Date(Number(input)); // handles both timestamp strings and numbers
    } else {
        return "Invalid Date";
    }

    if (isNaN(date.getTime())) return "Invalid Date";

    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60; // in minutes
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const istDate = new Date(utc + (istOffset * 60000));

    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');

    let hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const period = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert 0 to 12

    return `${day}-${month}-${year} ${String(hours).padStart(2, '0')}:${minutes} ${period}`;
}






