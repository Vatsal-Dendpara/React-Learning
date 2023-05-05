setTimeout(() => {
  const Person = (props) => {
    return React.createElement("div", {}, [
      React.createElement("h1", { key: 1 }, props.name),
      React.createElement("i", { key: 2 }, props.role),
    ]);
  };
  const App = () => {
    return React.createElement("div", {}, [
      React.createElement("h1", { class: "title" }, "React is rendered."),
      React.createElement(
        Person,
        {
          name: "Vatsal",
          role: "Technical Architect",
        },
        null
      ),
      React.createElement(Person, { name: "Smit", role: "SDE I" }, null),
      React.createElement(Person, { name: "Prit bhai", role: "Intern" }, null),
    ]);
  };

  //   ReactDOM.render(React.createElement(App), document.getElementById("root"));

  //React V18 syntax
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(App));
}, 2000);
