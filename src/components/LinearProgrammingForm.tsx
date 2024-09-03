import React, { useState } from "react";
import Modal from "./Modal"; // Componente del modal

const LinearProgrammingForm: React.FC = () => {
  const [isMaximizing, setIsMaximizing] = useState(true);
  const [objectiveFunction, setObjectiveFunction] = useState("");
  const [variables, setVariables] = useState<string[]>(["x1", "x2"]); // Lista de variables definidas
  const [variableNames, setVariableNames] = useState<string[]>(["", ""]); // Nombres de variables definidos por el usuario
  const [constraints, setConstraints] = useState<string[]>(["", ""]); // Restricciones
  const [constraintNames, setConstraintNames] = useState<string[]>(["Restricción 1", "Restricción 2"]); // Nombres de restricciones
  const [errors, setErrors] = useState<{ [key: number]: string }>({}); // Mapa de errores

  const handleVariableNameChange = (index: number, value: string) => {
    const newVariableNames = [...variableNames];
    newVariableNames[index] = value;
    setVariableNames(newVariableNames);
  };

  const handleConstraintChange = (index: number, value: string) => {
    const newConstraints = [...constraints];
    newConstraints[index] = value;

    // Validación: encontrar variables no definidas
    const invalidVariables = value.match(/[a-zA-Z]\w*/g)?.filter(
      (variable) => !variables.includes(variable)
    );

    const newErrors = { ...errors };
    if (invalidVariables && invalidVariables.length > 0) {
      newErrors[index] = `Variable(s) no definida(s): ${invalidVariables.join(", ")}`;
    } else {
      delete newErrors[index];
    }

    setConstraints(newConstraints);
    setErrors(newErrors);
  };

  const handleAddVariable = () => {
    setVariables([...variables, `x${variables.length + 1}`]);
    setVariableNames([...variableNames, ""]);
  };

  const handleAddConstraint = () => {
    setConstraints([...constraints, ""]);
    setConstraintNames([...constraintNames, `Restricción ${constraints.length + 1}`]);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* Toggle de maximizar/minimizar */}
      <div className="flex items-center mb-4">
        <span className="mr-2 text-gray-700 dark:text-gray-300">Minimizar</span>
        <div className="relative">
          <input
            type="checkbox"
            id="maximize-toggle"
            checked={isMaximizing}
            onChange={() => setIsMaximizing(!isMaximizing)}
            className="sr-only"
          />
          <div className="block bg-gray-400 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
          <div
            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isMaximizing ? "transform translate-x-full" : ""
              }`}
          ></div>
        </div>
        <span className="ml-2 text-gray-700 dark:text-gray-300">Maximizar</span>
      </div>

      {/* Input de nombres de variables */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Variables</h3>
        {variables.map((_, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Nombre de la variable ${index + 1}`}
              value={variableNames[index]}
              onChange={(e) => handleVariableNameChange(index, e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddVariable}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 mt-2"
        >
          Añadir Variable
        </button>
      </div>

      {/* Input de restricciones */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Restricciones</h3>
        {constraints.map((constraint, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              placeholder={`Expresión de ${constraintNames[index]}`}
              value={constraint}
              onChange={(e) => handleConstraintChange(index, e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            {/* Mostrar errores debajo del input */}
            {errors[index] && <p className="text-red-500 mt-1">{errors[index]}</p>}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddConstraint}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 mt-2"
        >
          Añadir Restricción
        </button>
      </div>

      {/* Modal con resultados (no funcional por ahora) */}
      <Modal isOpen={false}>
        {/* Aquí se mostrarían los resultados en el futuro */}
        dada
      </Modal>
    </div>
  );
};

export default LinearProgrammingForm;
