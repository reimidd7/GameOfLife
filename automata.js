
class Automata {
    constructor(game) {
        Object.assign(this, { game });

        this.ticks = 0;
        this.tickCount = 0;
        this.width = 200;
        this.height = 100;

        this.life = [];

        this.speed = parseInt(document.getElementById("speed").value, 10);


        // create empty "dead" life board
        for (let row = 0; row < this.width; row++) {
            this.life.push([]);
            for (let col = 0; col < this.height; col++) {
                this.life[row][col] = 0;
            }

        }
        this.loadRandom();


    };

    loadRandom() {
        for (let row = 0; row < this.width; row++) {
            for (let col = 0; col < this.height; col++) {
                this.life[row][col] = randomInt(2);
            }

        }

    }


    count(row, col) {
        let count = 0;

        const offsets = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];

        for (const [dRow, dCol] of offsets) {
            const newRow = row + dRow;
            const newCol = col + dCol;

            if (newRow >= 0 && newRow < this.width && newCol >= 0 && newCol < this.height) {
                if (this.life[newRow][newCol] == 1) {
                    count++;
                }
            }
        }
        // console.log("row " + row + " col " + col + "   " + count);
        return count;
    };

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let updated = [];
            for (let row = 0; row < this.width; row++) {
                updated.push([]);
                for (let col = 0; col < this.height; col++) {
                    this.cell = this.life[row][col];
                    if (this.cell && (this.count(row, col) > 3 || this.count(row, col) < 2)) {
                        updated[row][col] = 0;
                    }
                    if (this.cell && (this.count(row, col) === 2 || this.count(row, col) === 3)) {
                        updated[row][col] = 1;
                    }
                    if (!this.cell && this.count(row, col) === 3) {
                        updated[row][col] = 1;
                    }
                }

            }
            this.life = updated;
        }

    };

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.life[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    };

};
