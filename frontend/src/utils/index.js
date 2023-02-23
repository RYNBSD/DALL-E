import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constant/index";

export const getRandomPrompt = () => {
  return surpriseMePrompts[Math.floor(Math.random() * (surpriseMePrompts.length-1))];
}

export const downloadImage = async (_id, photo) => {
  FileSaver.saveAs(photo, `image-${_id}.jpeg`);
}