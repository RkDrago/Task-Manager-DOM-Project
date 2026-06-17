# Task Manager Application

A fully interactive Task Manager Application built using **HTML, CSS, and Vanilla JavaScript**.

This project demonstrates core browser and DOM concepts including DOM Manipulation, Event Handling, Event Delegation, Event Propagation, Attributes vs Properties, and the Browser Rendering Pipeline.

---

# Concepts Explained

## 1. Parsing

Parsing is the process where the browser reads HTML code and understands its structure.

Example:

```html
<h1>Hello World</h1>
```

The browser analyzes the tags, attributes, and content to determine how elements are related to each other.

Parsing is the first step in converting HTML into something the browser can render on the screen.

---

## 2. Tokenization

During tokenization, the browser breaks the HTML source code into small pieces called **tokens**.

Example:

```html
<h1>Hello World</h1>
```

becomes:

```text
Opening Tag Token -> <h1>
Text Token -> Hello World
Closing Tag Token -> </h1>
```

These tokens are then used by the parser to build the DOM Tree.

---

## 3. DOM Tree (Document Object Model)

After tokenization and parsing, the browser creates a tree-like structure called the DOM Tree.

Example:

```html
<body>
  <h1>Hello</h1>
  <p>Welcome</p>
</body>
```

DOM Tree:

```text
Document
 └── html
      └── body
           ├── h1
           └── p
```

Each HTML element becomes a node in the tree.

JavaScript interacts with the webpage through the DOM Tree using methods like:

```javascript
document.getElementById()
document.querySelector()
createElement()
append()
```

---

## 4. CSSOM Tree (CSS Object Model)

While the browser builds the DOM Tree from HTML, it also reads CSS and creates a CSSOM Tree.

Example:

```css
h1 {
  color: blue;
}
```

The CSSOM Tree stores all styling information and relationships between CSS rules.

The browser uses the CSSOM to determine how each element should appear on the screen.

---

## 5. Render Tree

The Render Tree is created by combining:

```text
DOM Tree
+
CSSOM Tree
```

The Render Tree contains only visible elements and their styles.

Example:

```text
DOM Tree + CSSOM Tree
          ↓
      Render Tree
```

The browser uses the Render Tree to calculate layout and paint the final webpage.

---

## 6. Event Bubbling

Event Bubbling is the default event propagation behavior in JavaScript.

When an event occurs on a child element, it first runs on the child and then moves upward through its parent elements.

Structure:

```text
Grandparent
 └── Parent
      └── Child
```

Execution Order:

```text
Child
Parent
Grandparent
```

Example:

```javascript
child.addEventListener("click", () => {
  console.log("Child");
});

parent.addEventListener("click", () => {
  console.log("Parent");
});

grandparent.addEventListener("click", () => {
  console.log("Grandparent");
});
```

This behavior is called bubbling because the event "bubbles up" through the DOM hierarchy.

---

## 7. Event Capturing

Event Capturing is the opposite of Event Bubbling.

The event starts from the outermost ancestor and travels down to the target element.

Execution Order:

```text
Grandparent
Parent
Child
```

Example:

```javascript
grandparent.addEventListener(
  "click",
  () => {
    console.log("Grandparent");
  },
  true
);
```

Passing `true` as the third argument enables the capturing phase.

---

## 8. Event Delegation

Event Delegation is a technique where a single event listener is attached to a parent element instead of attaching listeners to multiple child elements.

Example:

```javascript
taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    console.log("Delete Task");
  }
});
```

Instead of adding separate click listeners to every task button, one listener on the parent container handles all child button clicks.

### Benefits

* Better performance
* Less memory usage
* Works with dynamically created elements
* Easier to maintain code

This project uses Event Delegation to handle Edit, Complete, and Delete actions for dynamically generated task cards.
