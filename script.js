document.addEventListener('DOMContentLoaded', () => {
    const gameMessageEl = document.getElementById('game-message');
    const playerHpEl = document.getElementById('player-hp');
    const enemyNameEl = document.getElementById('enemy-name');
    const enemyHpEl = document.getElementById('enemy-hp');
    const enemyImageEl = document.getElementById('enemy-image');
    const startBtn = document.getElementById('start-btn');
    const battleCommandsEl = document.getElementById('battle-commands');
    const attackBtn = document.getElementById('attack-btn');
    const healBtn = document.getElementById('heal-btn');
    const runBtn = document.getElementById('run-btn');

    let player = {
        name: 'hoshizora',
        hp: 100,
        maxHp: 100,
    };

    let enemy = {};

    const enemies = [
        {
            name: '宇宙スライム',
            hp: 30,
            image: 'https://i.ibb.co/VMyh28Y/planet1.png'
        },
        {
            name: 'スペースゴブリン',
            hp: 50,
            image: 'https://i.ibb.co/S3GzH2s/spaceship.png'
        },
        {
            name: '魔王',
            hp: 100,
            image: 'https://i.ibb.co/L8y2D2n/starry-night-sky.png'
        }
    ];

    function updateStatus() {
        playerHpEl.textContent = player.hp;
        enemyHpEl.textContent = enemy.hp;
    }

    function showMessage(message) {
        gameMessageEl.textContent = message;
    }

    function startGame() {
        startBtn.classList.add('hidden');
        showMessage('冒険が始まった！');
        setTimeout(() => {
            encounterEnemy();
        }, 1500);
    }

    function encounterEnemy() {
        const randomIndex = Math.floor(Math.random() * enemies.length);
        enemy = { ...enemies[randomIndex] };
        
        enemyNameEl.textContent = enemy.name;
        enemyImageEl.src = enemy.image;
        enemyImageEl.classList.remove('hidden');
        
        document.getElementById('enemy-status').classList.remove('hidden');
        battleCommandsEl.classList.remove('hidden');
        
        updateStatus();
        showMessage(`${enemy.name}が現れた！`);
    }

    function playerAttack() {
        const playerDamage = Math.floor(Math.random() * 20) + 10;
        enemy.hp -= playerDamage;
        updateStatus();
        showMessage(`勇者の攻撃！${enemy.name}に${playerDamage}のダメージ！`);

        if (enemy.hp <= 0) {
            enemy.hp = 0;
            updateStatus();
            setTimeout(() => {
                winBattle();
            }, 1000);
            return;
        }

        setTimeout(() => {
            enemyAttack();
        }, 1500);
    }

    function enemyAttack() {
        const enemyDamage = Math.floor(Math.random() * 15) + 5;
        player.hp -= enemyDamage;
        updateStatus();
        showMessage(`${enemy.name}の反撃！勇者は${enemyDamage}のダメージ！`);

        if (player.hp <= 0) {
            player.hp = 0;
            updateStatus();
            setTimeout(() => {
                gameOver();
            }, 1000);
        }
    }

    function playerHeal() {
        const healAmount = Math.floor(Math.random() * 25) + 15;
        player.hp = Math.min(player.maxHp, player.hp + healAmount);
        updateStatus();
        showMessage(`勇者は回復した！HPが${healAmount}回復！`);

        setTimeout(() => {
            enemyAttack();
        }, 1500);
    }

    function playerRun() {
        const runSuccess = Math.random() > 0.5;
        if (runSuccess) {
            showMessage('勇者はなんとか逃げ出した！');
            setTimeout(() => {
                resetGame();
            }, 2000);
        } else {
            showMessage('逃げられない！');
            setTimeout(() => {
                enemyAttack();
            }, 1500);
        }
    }

    function winBattle() {
        showMessage('モンスターを倒した！次の冒険へ！');
        battleCommandsEl.classList.add('hidden');
        enemyImageEl.classList.add('hidden');
        document.getElementById('enemy-status').classList.add('hidden');
        setTimeout(() => {
            encounterEnemy();
        }, 2000);
    }

    function gameOver() {
        showMessage('勇者は力尽きた…ゲームオーバー！');
        battleCommandsEl.classList.add('hidden');
        startBtn.classList.remove('hidden');
    }

    function resetGame() {
        player.hp = player.maxHp;
        updateStatus();
        showMessage('新しい冒険が始まる！');
        battleCommandsEl.classList.add('hidden');
        enemyImageEl.classList.add('hidden');
        document.getElementById('enemy-status').classList.add('hidden');
        setTimeout(() => {
            startBtn.classList.remove('hidden');
        }, 1500);
    }

    startBtn.addEventListener('click', startGame);
    attackBtn.addEventListener('click', playerAttack);
    healBtn.addEventListener('click', playerHeal);
    runBtn.addEventListener('click', playerRun);
});
