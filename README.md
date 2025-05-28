# @n0n3br/react-use-scroll-sync

A React hook that synchronizes scrolling across multiple elements. Useful for side-by-side comparisons, split views, or any scenario where synchronized scrolling enhances user experience.

[![npm version](https://badge.fury.io/js/%40n0nb3br%2Freact-use-scroll-sync.svg)](https://badge.fury.io/js/%40n0nb3br%2Freact-use-scroll-sync)

## Features

- Synchronizes vertical and horizontal scrolling.
- Supports proportional scrolling (elements scroll proportionally to their content size).
- Lightweight and easy to use.
- Written in TypeScript.

## Installation

Using pnpm:

```bash
pnpm add @n0n3br/react-use-scroll-sync
```

Using npm:

```bash
npm install @n0n3br/react-use-scroll-sync
```

Using yarn:

```bash
yarn add @n0n3br/react-use-scroll-sync
```

## Usage

```tsx
import React, { useRef } from "react";
import { useScrollSync } from "@n0n3br/react-use-scroll-sync";

const MyComponent = () => {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLTextAreaElement>(null);

  // Synchronize scrolling for ref1, ref2, and ref3
  useScrollSync([ref1, ref2, ref3]);

  // With options
  // useScrollSync([ref1, ref2], { horizontal: true, vertical: true, proportional: false });

  return (
    <div style={{ display: "flex" }}>
      <div
        ref={ref1}
        style={{
          width: "200px",
          height: "200px",
          overflow: "auto",
          border: "1px solid black",
          marginRight: "10px",
        }}
      >
        {/* Long content here */}
        {[...Array(50)].map((_, i) => (
          <div key={i}>Item {i + 1} in Pane 1</div>
        ))}
      </div>
      <div
        ref={ref2}
        style={{
          width: "300px",
          height: "200px",
          overflow: "auto",
          border: "1px solid black",
        }}
      >
        {/* Different long content here */}
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{ height: "30px" }}>
            Item {i + 1} in Pane 2
          </div>
        ))}
      </div>
      <textarea
        ref={ref3}
        style={{
          width: "200px",
          height: "200px",
          overflow: "auto",
          border: "1px solid black",
          marginLeft: "10px",
        }}
      >
        {[...Array(100)].map((_, i) => `Line ${i + 1} in Textarea\n`).join("")}
      </textarea>
    </div>
  );
};

export default MyComponent;
```

## API

### `useScrollSync(refs, options?)`

- `refs`: `React.RefObject<HTMLElement | null>[]`
  An array of React refs pointing to the DOM elements whose scrolling should be synchronized.
- `options` (optional): `object`
  - `horizontal` (optional): `boolean` - Enable horizontal scroll synchronization. Defaults to `true`.
  - `vertical` (optional): `boolean` - Enable vertical scroll synchronization. Defaults to `true`.
  - `proportional` (optional): `boolean` - Enable proportional scroll synchronization. When `true`, elements will scroll proportionally to their `scrollWidth`/`scrollHeight` relative to their `clientWidth`/`clientHeight`. When `false`, they scroll pixel by pixel. Defaults to `true`.

### Returns

- `{ triggerSync: () => void }`: An object containing a `triggerSync` function.
  - `triggerSync`: A function that can be called to manually re-synchronize the scroll positions of the elements. This can be useful if content changes dynamically and affects scroll dimensions.

## Example App

An example application demonstrating the usage of `react-use-scroll-sync` can be found in the `example` directory of this repository.

To run the example:

1.  Clone the repository.
2.  Navigate to the `example` directory.
3.  Install dependencies: `pnpm install`
4.  Start the development server: `pnpm dev`

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

MIT © [rogeriolaa](https://github.com/rogeriolaa)
