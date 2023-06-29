A simple utility I made to help with directions and their associated abbreviations.

```ts
new Direction(42).symbol //'NE'
new Direction("ne").direction //45
new Direction(0).rotate(-45).symbol //'NW'
new Direction("invalid").direction //null
new Direction("invalid").symbol //null
```