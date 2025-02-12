let path = require('path');
const mongoose = require("mongoose");
const express = require("express");
const { Translate } = require("@google-cloud/translate").v2;
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

const grp2OpsRouter = require("./backend/routes/OpsCount");
const statsRouter = require("./backend/routes/statsCount");
const eventApiRouter = require("./backend/routes/event-api");
const catApiRouter = require("./backend/routes/category-api")
const Event = require("./backend/models/event");
const Category = require("./backend/models/category");

// configure express ==============================================================================
const cors = require('cors');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(cors({ origin: 'http://34.69.37.13:8888' }));

/**
 * port number
 * @const
 */
const PORT_NUMBER = 8888;

/**
 * Configure the port number
 * @name listen 
 * @function
 * @param {int} PORT_NUMBER - express port number
 * @param {Function} callback - Express callback 
 */
server.listen(PORT_NUMBER, function () {
    console.log(`listening on port ${PORT_NUMBER}`);
});

// Tell Express.js to parse the body of the incoming requests in urlencoded format
app.use(express.urlencoded({ extended: true }));
// need to tell express that we're parsing json data
app.use(express.json());

// reference to static assets
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("backend/images"));   
app.use("/", express.static(path.join(__dirname, "dist/event-management-webapp")));
app.use(express.static("public")); 

// configure EJS rendering engine 
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// configure mongoose =============================================================================
/**
 * mongo db connection url
 * @const
*/
const url = "mongodb://127.0.0.1:27017/event-management-webapp";

async function connect(url) {
	await mongoose.connect(url);
	return "Connected Successfully";
}
connect(url)
	.then(console.log)                      // to log "Connected Successfully" onto terminal
	.catch((err) => console.log(err));      // catch if error occurs 


// routers for endpoints ==========================================================================
app.use("/api/v1", grp2OpsRouter);
app.use("/api/v1", eventApiRouter);
app.use("/api/v1", catApiRouter);
app.use("/api/v1", statsRouter);




// Translator backend using socket.io =============================================================
// create instance 
const translate = new Translate();

// translate request
async function translateMyText(text, target) {
	let translationObj = await translate.translate(text, target);
	let translation = translationObj[0]

	return translation
}

// wait for connections 
io.on("connection", (socket) => {

	// listen for events 
	socket.on("translate", async (data) => {
		// prepare request
		let theText = data.inputText;
		let targetLanguage = data.language;

		result = await translateMyText(theText, targetLanguage);
		data.translatedText = result;

		io.emit("onTranslate", data);
	});
	//Calling from backend ot front end 
	socket.on("textToSpeech", async (data) => {
		// prepare request
		let theAudio = data;
		console.log(theAudio);
		convertToSpeech(theAudio);
	});


});


//Text to speech backend using socket.io
const fs = require("fs");

// Creates a client
projectId = "<Your Google Cloud service account project id>";
const client = new textToSpeech.TextToSpeechClient({projectId, keyFilename: __dirname + "<name of your Google Cloud service account key file>" });

audioList = [];
idCounter = 1000;

function convertToSpeech(text){
	//Construct the request
	const request = {
		input: { text: text.inputText },
		// Select the language and SSML Voice Gender (optional)
		voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
		// Select the type of audio encoding
		audioConfig: { audioEncoding: "MP3" },
	};
	
	// Performs the Text-to-Speech request
	client.synthesizeSpeech(request, (err, response) => {
		if (err) {
		console.error("ERROR:", err);
		return;
		}

	// Write the binary audio content to a local file
	fs.writeFile(__dirname + "/public/" + "output_"+ idCounter + ".mp3", response.audioContent, "binary", err => {
		if (err) {
		console.error("ERROR:", err);
		return;
		}
		console.log("Audio content written to file: output" + idCounter + ".mp3");
		path = "output_" + idCounter + ".mp3";
		//path = "/public/output_" + idCounter + ".mp3"

		console.log('path: ' + path)

		idCounter++;

		let result = {
			audioSpeech: path,
		  }

		audioList.push(result)

		// the server then emits the translation back to all clients using a socket.io event
		io.sockets.emit("speechResult", audioList)
		});
	});
};