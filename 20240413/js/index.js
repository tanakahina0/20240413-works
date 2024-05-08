// js-todo-ttl
// js-todo-list
// js-done-list
// js-register-btn

const todoValue = document.getElementById('js-todo-ttl'); // 入力フォームの取得
const todoRegister = document.getElementById('js-register-btn'); // 登録するボタンの取得
const todoList = document.getElementById('js-todo-list'); //未完リストのulタグを取得
const doneList = document.getElementById('js-done-list'); //完了リストのulタグを取得

todoRegister.addEventListener('click',function(){
    if (todoValue.value === '') {
        alert('タスクを入力してください');
        return; // タスクが入力されていない場合は処理を終了する
    }else {
    const todo = document.createTextNode(todoValue.value); // 入力データを取得
    // liタグとPタグを作る準備
    const liTag = document.createElement('li');
    const pTag = document.createElement('p');

    // ulタグの中にli>pの構造を作る appendChild>Pタグの中に子供として新しくタグを作成する
    pTag.appendChild(todo); //pTagの中に入力データを
    liTag.appendChild(pTag); //liTagの中にpTagを
    todoList.appendChild(liTag); //todoList(ulタグ)の中にliTagを

    // ボタンを入れる用のdivタグの追加
    const btn_box = document.createElement('div'); // divタグの準備
    btn_box.setAttribute('class','btn-box'); // divタグにbtn_boxというclass名を指定する
    liTag.appendChild(btn_box); // liTagの子要素としてbtn_boxを追加
    
    // 完了ボタンの追加 (id名：js-done-btn テキスト名：完了)
    const done_btn = document.createElement('button');
    done_btn.setAttribute('id','js-done-btn');
    done_btn.innerHTML = "完了";
    btn_box.appendChild(done_btn);

    // 削除ボタンの追加 (id名：js-del-btn テキスト名：削除)
    const del_btn = document.createElement('button');
    del_btn.setAttribute('id','js-del-btn');
    del_btn.innerHTML = "削除";
    btn_box.appendChild(del_btn);

    // 色変更ボタンの追加 (id名：js-del-btn テキスト名：削除)
    const color_btn = document.createElement('button');
    color_btn.setAttribute('id','js-color-btn');
    color_btn.innerHTML = "重要";
    btn_box.appendChild(color_btn);    

    // 完了機能の追加
    done_btn.addEventListener('click',function(){
        // ★処理を関数で呼び出す
        doneTodo(done_btn);
    })

    // 削除機能の追加
    del_btn.addEventListener('click',function(){
        // ☆処理を関数で呼び出す
        deleteTodo(del_btn);
    })

    // 色変更機能の追加
    
    color_btn.addEventListener('click',function(){
        // ☆処理を関数で呼び出す
        colorTodo(color_btn);
    })   
    }
});

// ★
const doneTodo = function(done_btn){
    const doneTodo = done_btn.closest('li'); // クリックされた完了ボタンから一番近いliタグを取得
    doneTodo.setAttribute('class','done-item'); // 削除ボタンのイベントの条件分岐のための準備
    doneList.appendChild(doneTodo); // 完了リスト(doneList)の子要素として、取得したliタグを挿入
    done_btn.remove(); // 完了リストへ移動したliタグの完了ボタンの削除
}

// ☆
const deleteTodo = function(del_btn){
    const del_confirm = this.confirm('本当に削除しますか？'); // 誤って削除しないかの確認 this・・・クリックされた要素に対して
    if(del_confirm === true){ // 上記の確認でOKが押されたら
        const choseTodo = del_btn.closest('li'); // クリックされた削除ボタンから一番近いliタグを取得

        // 削除ボタンがクリックされたタスクが未完リスト内か、完了リスト内かで処理を変える
         //done=itemというクラス名が取得したliタグに入っているか確認する
        if(choseTodo.classList.contains('done-item')){
            doneList.removeChild(choseTodo); // 完了リスト内の該当のliタグを削除
        } else  { //入ってなかったら
            todoList.removeChild(choseTodo);  // 未完リスト内の該当のliタグを削除
        }

    }
}

// 色変更機能の関数
const colorTodo = function(color_btn){
    const colorTodo = color_btn.closest('li'); // クリックされた色変更ボタンから一番近いliタグを取得
    // タスクの色を変更する
    colorTodo.style.backgroundColor = '#ffe0eb';
    color_btn.remove();
}