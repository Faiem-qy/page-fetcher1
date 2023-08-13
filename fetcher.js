// import requires modules
const request = require("request");
const fs = require("fs");

// process command line arguments
const args = process.argv.slice(2);

// define fetcher function
//takes three arguments 
//url - url of the resource to download
//localFilepath - to save the sownloaded data
//callback - handle the result
const fetcher = (url, localFilePath, callback) => {
  request(url, (error, response, body) => {
    //Inside the fetcher function, we use the request library to make an HTTP request to the specified url. If there's an error during the request, we call the provided callback with the error.
    if (error) {
      callback(error);
    } else {
      fs.writeFile(localFilePath, body, (err) => {
        //If the HTTP request is successful, we use the fs.writeFile method to write the received body (response data) to the specified localFilePath
        if (err) {
          callback(err);
        } else {
          callback(null, body);
        }
      });
    }
  });
};


// invoke the fetcher function
// We invoke the fetcher function with the provided url, localFilePath, and a callback function. Inside this callback function, if there's an error, we log it. If there's no error, we calculate the file size and provide success feedback.
fetcher(args[0], args[1], (error, data) => {
  if (error) {
    console.error("Error", error);
  } else {
    const fileSize = getFilesizeInBytes(args[1]);
    console.log("File saves successfully");
    console.log(`Download and saved ${fileSize} bytes to ${args[1]}`);
  }
});


// The getFilesizeInBytes function uses the fs.statSync method to get file statistics, specifically the file size in bytes.
function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  return stats.size;
}