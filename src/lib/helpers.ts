export const calculateMessageItemWidth=(message:string)=> {
  // Define min and max widths
  const minWidthPercent = 20; // Minimum width in percentage
  const maxWidthPercent = 60; // Maximum width in percentage

  // Calculate the width based on the length of the message
  const messageLength = message.length;
  let widthPercent = minWidthPercent + (maxWidthPercent - minWidthPercent) * (messageLength / 100);

  // Ensure the width does not exceed the maximum
  widthPercent = Math.min(widthPercent, maxWidthPercent);

  // Return the width as a string with '%' appended
  return `${widthPercent}%`;
}