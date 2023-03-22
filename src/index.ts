import { TaskCollection } from "./models/taskCollection.js";
import inquirer from "inquirer";
import { JsonTaskCollection } from "./models/jsonTaskCollection.js";
import { tasks } from "./exampleData.js";
import { Commands } from "./commands.js";

let collection: TaskCollection = new JsonTaskCollection("Хашаа", tasks);
let showCompleted = true;
let score:number = 0;
const questions = collection.getTaskItems(showCompleted).map((item) => ({
  value: item.id,
  name: item.task,
  translate: item.translate,
  checked: item.complete,
}));

function displayTaskList(): void {
  console.log(
    `${collection.userName}'s карт ` +
      `(${collection.getTaskCounts().incomplete} картууд)`
  );
  collection.getTaskItems(showCompleted).forEach((task) => task.printDetails());
}

async function promptAdd(): Promise<void> {
  console.clear();
  const question = await inquirer.prompt({
    type: "input",
    name: "add",
    message: "Англи үгийг оруулна уу:",
  });
  const answers = await inquirer.prompt({
    type: "input",
    name: "add",
    message: "Монгол үгийг оруулна уу",
  });
  if (question["add"] && answers["add"] !== "") {
    collection.addTask(question["add"], answers["add"]);
  }
  promptUser();
}
async function promptPlay(): Promise<void> {

  const myArray = Object.values(questions);
  const randomIndex = Math.floor(Math.random() * myArray.length);
  const randomElement = myArray[randomIndex];
  
  console.log("Энэ үгийн орчуулгыг бичнэ үү ("+randomElement.name+")");
  const userAnswer = await inquirer.prompt({
    type: "input",
    name: "add",
    message: "Хариултыг оруулна уу",
  });
  
    if (userAnswer.add === randomElement.translate) {
      score++;
      console.log("Зөв!"+"Таны оноо бол "+score);
    } else {
      console.log("Буруу!"+"Зөв хариулт бол "+randomElement.translate);
    }
    promptPlay()
  };



async function promptComplete(): Promise<void> {
  console.clear();
  const answers = await inquirer.prompt({
    type: "checkbox",
    name: "complete",
    message: "Устгах үгийг сонгоно уу",
    choices: collection.getTaskItems(showCompleted).map((item) => ({
      name: item.task,
      value: item.id,
      checked: item.complete,
    })),
  });
  let completedTasks = answers["complete"] as number[];
  collection
    .getTaskItems(true)
    .forEach((item) =>
      collection.markComplete(
        item.id,
        completedTasks.find((id) => id === item.id) != undefined
      )
    );
  promptUser();
}

async function promptUser(): Promise<void> {
  console.clear();
  displayTaskList();
  const answers = await inquirer.prompt({
    type: "list",
    name: "command",
    message: "Сонгоно уу",
    choices: Object.values(Commands),
  });
  switch (answers["command"]) {
    case Commands.Play:
      promptPlay();
      // promptUser();
      break;
    case Commands.Add:
      promptAdd();
      break;
    case Commands.Complete:
      if (collection.getTaskCounts().incomplete > 0) {
        promptComplete();
      } else {
        promptUser();
      }
      collection.removeComplete();
      break;
    case Commands.Purge:
      collection.removeComplete();
      promptUser();
      break;
  }
}

promptUser();
