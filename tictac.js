run();

function run() {
    for(let i = 1; i <= 100; i++) {
        let v3 = i % 3 === 0;
        let v5 = i % 5 === 0;

        if(v3 && v5) console.log("TicTac");
        else if(v3) console.log("Tic");
        else if(v5) console.log("Tac")
        else console.log(i);
    }
}