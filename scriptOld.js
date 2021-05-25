
    const sudokuTable = document.getElementById('sudoku-table');
    const check_btn = document.querySelector('#check');
    const solve_btn = document.querySelector('#solve');
    const select_btn = document.querySelector('#select');
    let sudokuArray = 
    [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ]
    
// generate sudoku table
function sudokuGenerator(){
    for (let i = 0; i < 9; i++) {
      const subgrid = document.createElement('div')
      subgrid.className = 'subgrid'
      
      
      for (let j = 0; j < 9; j++) {
        // sudoku cell generator 
        const field = document.createElement('input')
        const iRow = Math.floor(i / 3) * 3 + Math.floor(j / 3)
        const iCol = (i % 3) * 3 + (j % 3)
        
        // sudoku cell attributes
        field.id=`${iRow}-${iCol}`;
        field.type = 'number' 
        field.className = 'field'
        field.min = '1'
        field.max = '9'
        
        // subgrid colorizer
        if(i%2==0){
          field.style.backgroundColor="#D3D3D3" } 
        else {
          field.style.backgroundColor="#A9A9A9" 
        }
        
      subgrid.appendChild(field)
      }
    
      sudokuTable.appendChild(subgrid)
    }
}  

sudokuGenerator();
    

function sudokuValidator(sudokuArr) {

// Each row is controlled with a control array
let rowctrl = sudokuArr.map(num => num).every(arr1d => compareArray(arr1d));


// Each column is controlled with a control array
function columnsControl(arr) {
  let ctrl = [];
  for (let i = 0; i < arr.length; i++) {
    let columns = []
    for (let j in arr) {
      columns.push(arr[j][i])
    }
    ctrl.push(columns)
  }
  return ctrl.every(num => compareArray(num))
}


// Each group is controlled with a control array
function groupChecker(arr) {
  let group = [];
  for (let count = 0; count < 3; count++)
    for (let i = 0; i < 9; i += 3) {
      group.push(arr[i].slice(0, 3).concat(arr[i + 1].slice(0, 3)).concat(arr[i + 2].slice(0, 3)));
    }
  return group.every(arr1d => compareArray(arr1d))
}


// function that control to two array, whether both equal
function compareArray(arr) {
  
  let controlWith = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const arrSorted = [...arr].sort((a,b)=>a-b);

  if (JSON.stringify(arrSorted) == JSON.stringify(controlWith)) {
        return true;
      } else {
        return false;
      }

}

return columnsControl(sudokuArr) && rowctrl && groupChecker(sudokuArr)
}


function sudokuSolver(data) {
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = k;
            if (sudokuSolver(data)) {
              return true;
            } else {
              data[i][j] = 0;
            }
          }
        }
        return false;
      }
    } 
  }
  return true;
 
 
  // control k value is proper for board[row][col] cell //
  function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + (i % 3);
      if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
        return false;
      }
    }
    return true;
  }
}


function firstValueInıtıalizer(choice="Easy"){
  const validBoard = [
    [ 5, 3, 4,  6, 7, 8,  9, 1, 2 ],
    [ 6, 7, 2,  1, 9, 5,  3, 4, 8 ],
    [ 1, 9, 8,  3, 4, 2,  5, 6, 7 ],
  
    [ 8, 5, 9,  7, 6, 1,  4, 2, 3 ],
    [ 4, 2, 6,  8, 5, 3,  7, 9, 1 ],
    [ 7, 1, 3,  9, 2, 4,  8, 5, 6 ],
  
    [ 9, 6, 1,  5, 3, 7,  2, 8, 4 ],
    [ 2, 8, 7,  4, 1, 9,  6, 3, 5 ],
    [ 3, 4, 5,  2, 8, 6,  1, 7, 9 ],
  ];

  // clean every cell before invoke firstValueAdder function
  cleanCell();
  
  switch(choice){
      case "Easy" : firstValueAdder(8);
      break;
      case "Medium" : firstValueAdder(6);
      break;
      case "Hard" : firstValueAdder(5); 
  }
  
  function firstValueAdder(n) {
    for(let i=0;i<n;i++){
      for(let j=0;j<n;j++){
         let I =  Math.floor(Math.random() * 9);
         let J =  Math.floor(Math.random() * 9);
         let element = document.getElementById(`${I}-${J}`)
         if(element.value>0){
             I =  Math.floor(Math.random() * 9); // random index creator for row
             J =  Math.floor(Math.random() * 9); // random index creator for column
             element = document.getElementById(`${I}-${J}`)
             element.value=validBoard[I][J];
             sudokuArray[I][J]=validBoard[I][J]; // initialize values add sudokuArray
             element.disabled =true;
         }
         element.disabled =true;
         element.value=validBoard[I][J];
         sudokuArray[I][J]=validBoard[I][J]; // initialize values add sudokuArray
      }
    }
  }

  function cleanCell() {
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
         let cell = document.getElementById(`${i}-${j}`);
         sudokuArray[i][j]=0;
         if(cell.value>0){
           cell.value="";
           cell.style.color="black";
           cell.disabled=false;
          }
          cell.style.color="black";
          cell.disabled=false;
      }
    }
  }
}
firstValueInıtıalizer();
console.log(sudokuArray)
// selection event func
function difficulty(){
  var x = select_btn.value;
  firstValueInıtıalizer(x)
  
} 

// check button event
  check_btn.addEventListener("click", () => {
    let check=false;
    // for (let i = 0; i < 9; i++) {
    //   for (let j = 0; j < 9; j++) {
    //     let input = document.getElementById(`${i}-${j}`);

        
                
    //     if (sudokuArray.length !== 9 && sudokuArray[8].length !== 9) {
    //       sudokuArray[i][j] = parseInt(input.value);
    //       console.log("working..")  
    //     }else{
    //        //console.log(sudokuValidator(sudokuArray));
          
    //       console.log("working..")
    //       // sudokuArray = [[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0]];
    //     }
    //   }
    // }
    check = sudokuValidator(sudokuArray);
    console.log(sudokuArray)
    console.log(check)
  });

// solve button event
  solve_btn.addEventListener('click',()=>{
    // fill empty sudoku array //
    // for(let i=0;i<9;i++){
        
    //   for(let j=0;j<9;j++){
    //     let inpt = document.getElementById(`${i}-${j}`);
    //     sudokuArray[i][j]=inpt.value; 
    //   }
    // }
   
    // invoke sudoku solver function //
    //console.log(sudokuArray)
    sudokuSolver(sudokuArray);
    //console.log(sudokuSolver(sudokuArray))
    for(let i=0 ; i<9 ;i++){
       
        for(let j=0; j<9 ; j++){
          let inpt = document.getElementById(`${i}-${j}`);
          if(inpt.value==0 || inpt.disabled==false){
            inpt.style.color='red';
            inpt.value = sudokuArray[i][j]     
          }
        }
    }
    console.log(sudokuArray)
});