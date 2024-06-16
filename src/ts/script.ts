function autoBinder(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const myDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return myDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  decriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // console.log(importedNode);
    this.element = importedNode.firstElementChild! as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.decriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | void {
    const EnteredTitle = this.titleInputElement.value;
    const EnteredDecription = this.decriptionInputElement.value;
    const EnteredPeople = this.peopleInputElement.value;
    if (
      EnteredTitle.trim().length === 0 ||
      EnteredDecription.trim().length === 0 ||
      EnteredPeople.trim().length === 0
    ) {
      alert("invalid Input ! please try agian...");
    } else {
      return [EnteredTitle, EnteredDecription, +EnteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.decriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
  @autoBinder
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInput();
    }
    // console.log(this.titleInputElement.value);
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const ProjectInputVarable = new ProjectInput();
