const DateFormatChange = ({ newDate }: { newDate: string }) => {
    const date = new Date(newDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
    return <>{formattedDate}</>;
}
 
export default DateFormatChange;