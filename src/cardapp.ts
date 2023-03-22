import inquirer from "inquirer";
import { TaskCollection } from "./models/taskCollection.js";
import { JsonTaskCollection } from "./models/jsonTaskCollection.js";
import { tasks } from "./exampleData.js";

let collection: TaskCollection = new JsonTaskCollection("Хашаа", tasks);
interface IApp{
    getDesc(): String;
    launch(): void;
}

class EditApp implements IApp{
    getDesc(): String {
        throw new Error("Method not implemented.");
    }
    launch(): void {
        throw new Error("Method not implemented.");
    }

}

class PlayApp implements IApp{
    getDesc(): String {
        throw new Error("Method not implemented.");
    }
    launch(): void {
        throw new Error("Method not implemented.");
    }

}

const apps: IApp[] = [
    new EditApp(),
    new PlayApp()
]

for(let i in apps) apps[i].getDesc();

while(true){
    async function promptAdd(): Promise<void> {
        console.clear();
        const question = await inquirer.prompt({
          type: "input",
          name: "add",
          message: "Англи үгийг оруулна уу:",
        });
        
      }

    apps[1].launch();

}