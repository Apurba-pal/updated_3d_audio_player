import { exec } from "child_process";
import path from "path";
import fs from "fs";

// Define paths
const ffmpegPath = "C:/TFN data/3D_AI_website/r3f-lipsync-tutorial-main/ffmpeg/bin/ffmpeg.exe"; // FFmpeg executable path
const rhubarbDir = "C:/TFN data/3D_AI_website/r3f-lipsync-tutorial-main/Rhubarb-Lip-Sync"; // Rhubarb directory
const inputAudioMP3 = "C:/TFN data/3D_AI_website/r3f-lipsync-tutorial-main/public/audios/sample_audio.mp3"; // MP3 file
const convertedAudioOGG = "C:/TFN data/3D_AI_website/r3f-lipsync-tutorial-main/public/audios/sample_audio.ogg"; // Converted OGG file
const outputJson = "C:/TFN data/3D_AI_website/r3f-lipsync-tutorial-main/public/audios/sample_audio.json"; // Output JSON

// Function to convert MP3 to OGG
function convertToOgg(inputFile, outputFile, callback) {
    console.log("Converting MP3 to OGG...");
    const command = `"${ffmpegPath}" -i "${inputFile}" -y "${outputFile}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`FFmpeg error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`FFmpeg stderr: ${stderr}`);
        }
        console.log(`Conversion complete: ${outputFile}`);
        callback(); // Run the next step (Rhubarb) after conversion
    });
}

// Function to run Rhubarb Lip Sync
function runRhubarb(inputFile, outputFile) {
    console.log("Running Rhubarb Lip Sync...");
    const command = `cd "${rhubarbDir}" && rhubarb.exe -f json "${inputFile}" -o "${outputFile}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Rhubarb: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Rhubarb stderr: ${stderr}`);
        }
        console.log(`Lip sync JSON generated: ${outputFile}`);
    });
}

// Check if the OGG file already exists; if not, convert MP3 to OGG first
if (fs.existsSync(convertedAudioOGG)) {
    console.log("OGG file already exists. Skipping conversion...");
    runRhubarb(convertedAudioOGG, outputJson);
} else {
    convertToOgg(inputAudioMP3, convertedAudioOGG, () => {
        runRhubarb(convertedAudioOGG, outputJson);
    });
}
