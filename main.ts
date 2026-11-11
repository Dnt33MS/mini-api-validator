type Student = { id: number; name: string; scores: number[] };

const json = '{"id":1,"name":"Hermione","scores":[95, 100, 98]}';

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isStudent(x: unknown): x is Student {
  if (typeof x !== "object" || x === null) return false;
  const obj = x as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    Array.isArray(obj.scores) &&
    obj.scores.every((s) => typeof s === "number")
  );
}

function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((acc, n) => acc + n, 0) / nums.length;
}

const app = document.getElementById("app")!;
const data = safeParse(json);

if (isStudent(data)) {
  const h1 = document.createElement("h1");
  h1.textContent = data.name;
  const p = document.createElement("p");
  p.textContent = `Promedio: ${average(data.scores).toFixed(2)}`;
  app.append(h1, p);
} else {
  const error = document.createElement("p");
  error.textContent = "Error: la respuesta no tiene el formato esperado.";
  error.style.color = "red";
  app.append(error);
}
