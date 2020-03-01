// export const subjectsData = {
//   "ФИВТ": {
//     "ВТ": {
//       1: [
//         "Высшая Математика - 1", 
//         "Компьютерная Логика - 1", 
//         "Программирование", 
//         "Алгоритмы и Структуры Данных", 
//         "История Украины", 
//         "Основы Операционных Систем", 
//         "Линейная Алгебра(ЛААГ) - 1", 
//       ],
//       2: [
//         "Объектно-Ориентированное Программирование", 
//         "Физика", 
//         "Высшая Математика - 2", 
//         "Украинский Язык", 
//         "Дискретная Математика", 
//         "Компьютерная Логика - 2(Комп. Арифметика)", 
//       ],
//       3: [
//         "Высшая Математика - 3", 
//         "Инженерия програмного обеспечения - 1", 
//         "Теория Вероятностей и Математическая Статистика", 
//         "Вступление в Философию", 
//         "Компьютерная Графика", 
//         "Психология Конфликта", 
//         "ТЭЦ(ТЕМК) - 1", 
//       ],
//       4: [
//         "Системное Програмирование - 1", 
//         "Архитектура Компьютеров - 1", 
//         "ТЭЦ(ТЕМК) - 2", 
//         "Инженерия Програмного Обеспечения - 2", 
//         "Алгоритмы и Методы Вычислений", 
//         "ТПЕ(МОПЕ)", 
//         "Компьютерная Электроника - 1", 
//         "Экология",
//       ],
//     },
//     "TK": {
//       1: ["EASY", "AnotherEasy"],
//       4: ["EASSSSSSSSY", "TEST"]
//     }
//   },
//   "IPSA": {
//     "AE": {
//       1: ["A", "DD", "ASAS"],
//       2: ["ssss", "213s"],
//       4: ["2s21ss", "ssa31"],
//     },
//     "EMP": {
//       2: [],
//       3: [],
//     }
//   }
// }

export const rootHash = "aaaa";

export const structureData = {
  "aaaa": {
    name: "root",
    type: "dir",
    content: {
      "aaab": {
        name: "FICT",
        type: "dir",
        content : {
          "aaac": {
            name: "VT",
            type: "dir",
            content: {}
          },
          "aaad": {
            name: "TK",
            type: "dir",
            content: {
              "aaae": {
                name: "easy",
                type: "file",
                ext: "exe",
              },
              "aaaf": {
                name: "easyDir",
                type: "dir",
                content: {
                  "aaah": {
                    name: "SomeLoooooooooooooooooooooooooooooooooooongName",
                    type: "dir",
                    content: {}
                  }
                }
              }
            }
          },
          "aaai": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaaj": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaak": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaal": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaam": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaan": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaao": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaap": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaaq": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaar": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaas": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaat": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaau": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaaw": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaax": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaay": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaaz": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aaba": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabb": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabc": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabd": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabe": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabf": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabg": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabh": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabi": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabj": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabk": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabl": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabm": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
          "aabn": {
            name: "AUTS",
            type: "dir",
            content: {}
          },
        }
      },
      "aaag": {
        name: "IASA",
        type: "file",
        ext: "pdf"
      }
    }
  }
}

export const fileOptions = [
  {"label": "download", "action":() => {console.log("download")}},
  {"label": "properties", "action":() => {console.log("properties")}},
];

export const dirOptions = [
  {"label": "open", "action":() => {console.log("open")}},
  {"label": "download", "action":() => {console.log("download")}},
  {"label": "properties", "action":() => {console.log("properties")}},
];

export const spaceOptions = [
  {"label": "add directory", "action":() => {console.log("add directory")}},
  {"label": "upload file", "action":() => {console.log("upload file")}},
  {"label": "upload files", "action":() => {console.log("upload files")}},
  {"label": "upload directory", "action":() => {console.log("upload directory")}},
  {"label": "properties", "action":() => {console.log("properties")}},
];