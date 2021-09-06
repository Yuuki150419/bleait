//console.log("a");
//canvas����
const canvas = document.querySelector("#canvas"); // const=�萔�@id=canvas
const ctx = canvas.getContext("2d");
const canvas_w = canvas.width; // �L�����o�X�̕�(1000)
const canvas_h = canvas.height; // �L�����o�X�̍���(500)
let w = 0; // �o�́@��
let h = 0; // �o�́@����

let count = 0; // �N���b�N�� + ��
let store_click_count = 0; // �X�܂̌`��i���j�̃N���b�N��
let device_click_count = 0; // �q�@�̈ʒu�i�ԁj�̃N���b�N��
let wall_click_count = 0;  // �ǂ̃N���b�N��
let desk_click_count = 0;  // ���̃N���b�N��
let chair_click_count = 0; // �ǂ̃N���b�N��
let point_color = ""; // �_�̐F
let mode = ""; // ���[�h
let store_x = [], store_y = []; // �X�܂̍��W�z��
let device_x = [], device_y = []; // �q�@�̍��W�z��
let wall_x = [], wall_y = [];   // �ǂ̍��W�z��
let desk_x = [], desk_y = [];   // ���̍��W�z��
let chair_x = [], chair_y = []; // �֎q�̍��W�z�� 
let point_x = 0, point_y = 0, point_r = 4; // �_�`��
let click_x = 0, click_y = 0;  // �N���b�N�����ʒu
let store_flag = 0; // �t���O
let arrange_flag = 0;

let organized_values_x = 0, organized_values_y = 0; // ���������l 
//let organized_values_x_re = 0, organized_values_y_re = 0; // ���������l��߂����l

// canvas���N���b�N���ꂽ��
let onClick = (e) => {
    if(mode != move){
        let rect = e.target.getBoundingClientRect(); // window����̍��W
        click_x = Math.round(e.clientX - rect.left); // e.client window���ォ��̍��W �l�̌ܓ�
        click_y = Math.round(e.clientY - rect.top);  // rect window���ォ���canvas�̍��W
        if( 60 <= click_x && click_x <= 980 && 20 <= click_y && click_y <= 440){
            click_main(); // �����A�z��ɕۑ��@���s�܂�
            //document.getElementById("log").textContent = organized_values_x + " , " + organized_values_y;
        }
	}
}

// ���� (�`��܂�)
function click_main() { // click_x,y, scale_w,h_max, scale_step_row,h, mode
    //click_x = click_x%5<3 ? (click_x%5===0 ? click_x : Math.floor(click_x/5)*5) : Math.ceil(click_x/5)*5;
    //click_y = click_y%5<3 ? (click_y%5===0 ? click_y : Math.floor(click_y/5)*5) : Math.ceil(click_y/5)*5;
    point_x = (Math.round((click_x - Math.abs(20 - lattice_row)) /10)) * 10 + Math.abs(20 - lattice_row); // �_��łʒu�@�܂Ƃ߂�
    point_y = (Math.round((click_y - Math.abs(lattice_col)) /10)) * 10 + Math.abs(lattice_col);
    organized_values_x = ((     point_x - ( 100 - ((total_move_dis_x + 60) % 100))) * scale_row / scale_step_row / 100 +  scale_row / scale_step_row * parseInt((total_move_dis_x + 60) / 100)).toFixed(1); // ���ۂ̈ʒu �ŏ� 0.1m�@
    organized_values_y = ((500 - (100 - ((total_move_dis_y + 60) % 100)) - point_y) * scale_col / scale_step_col / 100 +  scale_col / scale_step_col * parseInt((total_move_dis_y + 60) / 100)).toFixed(1);
    //console.log("----------------")
    //console.log(scale_row / scale_step_row * parseInt((total_move_dis_x -40) / 100))
    //console.log("x = " + organized_values_x)
    //console.log("y = " + organized_values_y)
    //organized_values_x_re = (organized_values_x / scale_row * scale_step_row * 100 + 40 ).toFixed(0); // 240
    //organized_values_y_re = (460 - organized_values_y / scale_col * scale_step_col * 100).toFixed(0);
    if ( mode === "store"){ // �X�܂̌`��i���j
        point_color = "black";
        count = store_click_count;
        let result_x = Math.abs( organized_values_x - store_x[0]);
        let result_y = Math.abs( organized_values_y - store_y[0]);
        if ( count >= 3 && result_x <= 0.5 && result_y <= 0.5 && store_flag != 1 ){ // �l�p�`�ȏ�ɂȂ�Ƃ�
            point_x = (store_x[0] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
            point_y = (460 - store_y[0] / scale_col * scale_step_col * 100) + total_move_dis_y;
            organized_values_x = ((     point_x - ( 100 - ((total_move_dis_x + 60) % 100))) * scale_row / scale_step_row / 100 +  scale_row / scale_step_row * parseInt((total_move_dis_x + 60) / 100)).toFixed(1); // ���ۂ̈ʒu �ŏ� 0.1m�@
            organized_values_y = ((500 - (100 - ((total_move_dis_y + 60) % 100)) - point_y) * scale_col / scale_step_col / 100 +  scale_col / scale_step_col * parseInt((total_move_dis_y + 60) / 100)).toFixed(1);
            store_x.push(organized_values_x); // �z��ۑ�
            store_y.push(organized_values_y); // �z��ۑ�
            draw_point(); // �_�`��
            draw_line(store_x, store_y, total_move_dis_x, total_move_dis_y); // ���`��
            store_click_count += 1;
            save();
            store_flag = 1;  //  �l�p�`�ȏ�ɂȂ���
        }else if (store_flag != 1 ){
            store_x.push(organized_values_x); // �z��ۑ�
            store_y.push(organized_values_y); // �z��ۑ�
            draw_point(); // �_�`��
            draw_line(store_x, store_y, total_move_dis_x, total_move_dis_y); // ���`��
            store_click_count += 1;
            save();
        }
    }
    else if ( mode === "device" ) { //�q�@�̈ʒu�i�ԁj
        point_color = "red";
        count = device_click_count;
        device_x.push(organized_values_x); // �z��ۑ�
        device_y.push(organized_values_y); // �z��ۑ�
        draw_point(); // �_�`��
        device_click_count += 1;
        save();
    }
    else if ( mode === "wall" ) { // ��
        point_color = "black";
        count = wall_click_count;
        wall_x.push(organized_values_x); // �z��ۑ�
        wall_y.push(organized_values_y); // �z��ۑ�
        draw_point(); // �_�`��
        //console.log(count)
        if( count % 2 === 1){
            draw_line(wall_x, wall_y, total_move_dis_x, total_move_dis_y);
	    }
        wall_click_count += 1;
        save();
    }
    else if ( mode === "desk" ) { // ��
        point_color = "brown";
        count = desk_click_count;
        desk_x.push(organized_values_x); // �z��ۑ�
        desk_y.push(organized_values_y); // �z��ۑ�
        if ( (count+1) % 4 === 0){ // �l�p�`�ȏ�ɂȂ�Ƃ�
            //console.log(desk_x)
            //console.log(desk_y)
            draw_desk(desk_x, desk_y);
        }
        draw_point(); // �_�`��
        desk_click_count += 1;
        save();
    }
    else if ( mode === "chair" ) { // �֎q
        point_color = "pink";
        count = chair_click_count;
        chair_x.push(organized_values_x); // �z��ۑ�
        chair_y.push(organized_values_y); // �z��ۑ�
        draw_point(); // �_�`��
        chair_click_count += 1;
        save();
    }
}

//�_�`��
function draw_point() {
    ctx.beginPath();  //�p�X�̃��Z�b�g
    ctx.arc( point_x, point_y, point_r, 0, Math.PI * 2, true); // arc(x���W, y���W, ���a, �J�n�p�x, �I���p�x)
    ctx.fillStyle = point_color ; // �F�ݒ�
    ctx.fill() ;
}

// ���`��
function draw_line(x = [], y = []) { // �P�� m
    let line_x = [], line_y = [];   // ���������z��
    for (let i=0; i < x.length ; i++){
        line_x[i] = Math.round(x[i] / scale_row * scale_step_row * 100 + 40  - total_move_dis_x);
	}
    for (i=0; i < y.length ; i++){
        line_y[i] = Math.round(460 - y[i] / scale_col * scale_step_col * 100 + total_move_dis_y);
	}
    ctx.beginPath();  //�p�X�̃��Z�b�g
    ctx.moveTo( line_x[count-1], line_y[count-1] ) ; // ���������X�^�[�g�n�_
    ctx.lineTo( line_x[count], line_y[count] ) ; // �X�^�[�g�n�_����N���b�N�����n�_�܂ł̐�������
    ctx.strokeStyle = "black" ; //�F
    ctx.lineWidth = 2 ; //����
    ctx.stroke() ; //�`��
}

// �l�p�i���j�`��
function draw_desk(x = [], y = []) { // square = �n�܂�ʒux,y,��,����
    let square_x = [], square_y = [];
    for (let i=0; i < x.length ; i++){
        square_x[i] = Math.round(x[i] / scale_row * scale_step_row * 100 + 40  - total_move_dis_x);
	}
    for (i=0; i < y.length ; i++){
        square_y[i] = Math.round(460 - y[i] / scale_col * scale_step_col * 100 + total_move_dis_y);
	}
    square_x = square_x.slice(-4); // �z��̉�4��
    square_y = square_y.slice(-4);
    const Max = function (a, b) {return Math.max(a, b);}
    const Min = function (a, b) {return Math.min(a, b);}
    const max_x = square_x.reduce(Max);
    const min_x = square_x.reduce(Min);
    const max_y = square_y.reduce(Max);
    const min_y = square_y.reduce(Min);
    const square_w = max_x - min_x;
    const square_h = max_y - min_y;
    ctx.beginPath();  //�p�X�̃��Z�b�g
    //console.log(min_x)
    //console.log(min_y)
    ctx.rect( min_x, min_y, square_w, square_h) ; // ctx.rect( square_x - 4, square_y - 4, square_w + 8, square_h + 8) ;
    ctx.fillStyle = "brown" ;
    ctx.fill() ;
    //console.log(desk_y)
}

//window�I�u�W�F�N�g���ǂݍ��܂ꂽ�^�C�~���O�ŏ���
window.onload = ()=>{
    move(); // �ړ��{�^�������������
    lattice(); // �i�q�`��
    draw_scale(); // �X�P�[���`��
}
canvas.addEventListener("click", onClick, false); // canvas���N���b�N���ꂽ��


//���Z�b�g
function resetCanvas() {
    // �J�E���g���Z�b�g
    //save_count = 0;save_max_count = 0;
    store_click_count = 0;
    device_click_count = 0;
    wall_click_count = 0;
    desk_click_count = 0;
    chair_click_count = 0;

    // �z��폜
    store_x.length = 0; // �z��x�폜
    store_y.length = 0; // �z��y�폜
    device_x.length = 0; // �z��x�폜
    device_y.length = 0; // �z��y�폜
    wall_x.length = 0; // �z��x�폜
    wall_y.length = 0; // �z��y�폜
    desk_x.length = 0; // �z��x�폜
    desk_y.length = 0; // �z��y�폜
    chair_x.length = 0; // �z��x�폜
    chair_y.length = 0; // �z��y�폜

    // �}�E�X�֘A
    total_move_dis_x = 0, total_move_dis_y = 0; // ���v�ړ�����

    // �i�q
    //lattice_row = 0, lattice_col = 0; // �i�q�̕�,����
    //lattice_row_count = 0, lattice_col_count = 0;
    
    // �X�P�[��
    scale_col_value = 0, scale_row_value = 0; // �`�悷��X�P�[���̒l
    scale_interval_col = 0, scale_interval_row = 0; // �`�悷��X�P�[���̒l�̍� 4,8,12 = 4
    scale_col = 20; // �J�n���̃X�P�[��
    scale_row = 45; 

    //document.getElementById("log").textContent = "";
    store_flag = 0;
    lattice();
    draw_scale();
    //ctx_.beginPath(); //�����l�p�i�w�i�j
    //ctx_.fillStyle = "white" ;
    //ctx_.rect( 0, 0, ow, oh ) ;
    //ctx_.fill() ;
}

// �X�܂̌`��i���j
function store() {
    mode = "store";
}

// �q�@�̈ʒu�i�ԁj
function device() {
    mode = "device";
}

// ��
function wall() {
    mode = "wall";
}

// ��
function desk() {
    mode = "desk";
}

// �֎q
function chair() {
    mode = "chair";
}

// �ړ�
function move(){
    mode = "move";
}

let mag = 1; //

// ���S�ړ�
function center_move(){
    if(1 <=store_x.length){
        //console.log()
        const Max = function (a, b) {return Math.max(a, b);}
        const Min = function (a, b) {return Math.min(a, b);}
        let max_x = store_x.reduce(Max);
        let min_x = store_x.reduce(Min);
        let max_y = store_y.reduce(Max);
        let min_y = store_y.reduce(Min);
        let center_w = max_x - min_x;
        let center_h = max_y - min_y;
        for (i = 10; i >= 1 ; i -= 1){
            if(center_h  < (i * scale_step_col) && center_w  < (i * scale_step_row) ){
            mag = i;
            scale_col = mag * scale_step_col;
            scale_row = mag * scale_step_row;
	    	}
        }
        total_move_dis_x = (min_x - (scale_row - center_w) / 2) * 100 / mag;
        total_move_dis_y = (min_y - (scale_col - center_h) / 2) * 100 / mag;
        if(total_move_dis_x < 0){
            total_move_dis_x = 0;
    	}
        if(total_move_dis_y < 0){
            total_move_dis_y = 0;
	    }
        lattice();
        draw_scale();
        if(arrange_flag === 1){
            draw_canvas_arrange();
	    }else{
            draw_canvas();
        }
    }
}
// �X�e�[�^�X
function status(){
    console.log("------------------------------------")
    console.log(store_x);
    console.log(store_y);
    //console.log(device_x);
    //console.log(device_y);
    //console.log(wall_x);
    //console.log(wall_y);
    //console.log(desk_x);
    //console.log(desk_y);
    //console.log(chair_x);
    //console.log(chair_y);
}

 // ������
function arrange(){
    lattice();
    draw_scale();
    if(arrange_flag === 0){
        draw_canvas_arrange();
        arrange_flag = 1;
	}else{
        draw_canvas();
        arrange_flag = 0;
	}
}


// �}�E�X�֘A
let mouseMoveX, mouseMoveY, mouseDragX, mouseDragY;
let press = false;
let move_dis_x = 0, move_dis_y = 0; // �ړ����� Moving distance
let total_move_dis_x = 0, total_move_dis_y = 0; // ���v�ړ�����

canvas.addEventListener('mousewheel', canvasZoom);
canvas.addEventListener('mouseover', disableScroll);
canvas.addEventListener('mouseout', enableScroll);

// �}�E�X�J�[�\���ړ����̏���
function mouseMove(e) {
    //console.log()
    if(mode === "move"){
        let rect = e.target.getBoundingClientRect();
        if (press) {
            // �h���b�O����
            mouseDragX = e.clientX - rect.left; // �ړ��� �}�E�X�ʒu
            mouseDragY = e.clientY - rect.top ;
            move_dis_x = mouseMoveX - mouseDragX; // �ړ����� Moving distance
            move_dis_y = -1 * (mouseMoveY - mouseDragY);
            if((total_move_dis_x + move_dis_x) < 0 ){
                move_dis_x = move_dis_x + total_move_dis_x;
                total_move_dis_x = 0;
			}else if ((total_move_dis_y + move_dis_y) < 0 ){
                move_dis_y = move_dis_y + total_move_dis_y;
                total_move_dis_y = 0;
            }else {
                total_move_dis_x += move_dis_x; // ���v�ړ�����
                total_move_dis_y += move_dis_y;
			}
            lattice();
            draw_scale();
            if(arrange_flag === 1){
                draw_canvas_arrange();
	        }else{
                draw_canvas();
            }
            
            mouseMoveY = mouseDragY;
            mouseMoveX = mouseDragX;

        } else {
            // �ړ����W�̋L�^
            mouseMoveX = e.clientX - rect.left;
            mouseMoveY = e.clientY - rect.top;
        }
    }
}

// �h���b�O����p
canvas.addEventListener('mousedown', function(){
    if(mode === "move"){
        press = true;
    }
});

canvas.addEventListener('mouseup', function(){press = false;});
canvas.addEventListener('mouseout', function(){press = false;});
canvas.addEventListener('mousemove', mouseMove);

// �L�����o�X�ĕ`��
function draw_canvas(){ // total_move_dis_
    //console.log(count);
    point_color = "black";
    for(count = 0; count < store_x.length; count ++) { // �X��
        //console.log("-----------------------")
        point_x = (store_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - store_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
        draw_line(store_x, store_y, total_move_dis_x, total_move_dis_y); // ���`��
	}
    point_color = "red";
    for(count = 0; count < device_x.length; count ++) { // 
        point_x = (device_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - device_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
	}
    point_color = "black";
    for(count = 0; count < wall_x.length; count ++) { // 
        point_x = (wall_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - wall_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
        if( count % 2 === 1){
            draw_line(wall_x, wall_y, total_move_dis_x, total_move_dis_y); // ���`��
        }
	}
    point_color = "brown";
    for(count = 0; count < desk_x.length; count ++) { // 
        point_x = (desk_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - desk_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
        //console.log(desk_x,desk_y)
        if ( (count+1) % 4 === 0){ // �l�p�`�ȏ�ɂȂ�Ƃ�
            draw_desk(desk_x, desk_y);
        }
	}
    point_color = "pink";
    for(count = 0; count < chair_x.length; count ++) { // 
        point_x = (chair_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - chair_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
	}
    //organized_values_x_re = (organized_values_x / scale_row * scale_step_row * 100 + 40 ).toFixed(0); // 240
    //organized_values_y_re = (460 - organized_values_y / scale_col * scale_step_col * 100).toFixed(0);
}

// �ĕ`��@�_�Ȃ�
function draw_canvas_arrange(){ // total_move_dis_
    point_color = "black";
    for(count = 0; count < store_x.length; count ++) { // �X��
        draw_line(store_x, store_y, total_move_dis_x, total_move_dis_y); // ���`��
	}
    point_color = "red";
    for(count = 0; count < device_x.length; count ++) { // 
        point_x = (device_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - device_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
	}
    point_color = "black";
    for(count = 0; count < wall_x.length; count ++) { // 
        if( count % 2 === 1){
            draw_line(wall_x, wall_y, total_move_dis_x, total_move_dis_y); // ���`��
        }
	}
    point_color = "brown";
    for(count = 0; count < desk_x.length; count ++) { // 
        if ( (count+1) % 4 === 0){ // �l�p�`�ȏ�ɂȂ�Ƃ�
            draw_desk(desk_x, desk_y);
        }
	}
    point_color = "pink";
    for(count = 0; count < chair_x.length; count ++) { // 
        point_x = (chair_x[count] / scale_row * scale_step_row * 100 + 40 ) - total_move_dis_x;
        point_y = (460 - chair_y[count] / scale_col * scale_step_col * 100) + total_move_dis_y;
        draw_point(); // �_�`��
    }
}

// �i�q�`��
let lattice_col = 0, lattice_row = 0; // �i�q�̕�,����
let lattice_col_count = 0, lattice_row_count = 0; // �i�q�̐����ׂ�����
function lattice() { // 
    ctx.clearRect(0, 0, canvas_w, canvas_h);
    ctx.beginPath();
    ctx.fillStyle = "white"; // ���n
    ctx.fillRect(0, 0, canvas_w, canvas_h); // �w�i�͈�
    lattice_row = total_move_dis_x % 20; // �i�q�����n�߂̈ʒu
    lattice_col = total_move_dis_y % 20;
    lattice_row_count = parseInt(total_move_dis_x / 20); // ����
    lattice_col_count = parseInt(total_move_dis_y / 20);
    count = (3 + lattice_row_count ) % 5 ;
    for ( w = 20 - Math.abs(lattice_row); w < canvas_w; w += 20) { // �c��
        count += 1;
        if( count === 5){
            lattice_line_length_thick(); // �����c������
            count = 0;
        }else{
            lattice_line_length(); // �c������
        }
    }
    count = (3 + lattice_col_count ) % 5 ;
    for ( h = canvas_h - 20 + Math.abs(lattice_col); h > 0; h -= 20) { // ����
        count += 1;
        if( count === 5){
            lattice_line_width_thick(); // ������������
            count = 0;
        }else{
            lattice_line_width(); // ��������
        }
    }
    //�i�q �� �c
    function lattice_line_length() {
        ctx.beginPath();
        ctx.strokeStyle = "silver" //�F
        ctx.lineWidth = 0.4; //����
        ctx.moveTo(w, 0);
        ctx.lineTo(w, canvas_h);
        ctx.stroke() ;  //�`��
    }
    //�i�q �� �c ����
    function lattice_line_length_thick() {
        ctx.beginPath();
        ctx.strokeStyle = "gray" //�F
        ctx.lineWidth = 0.6; //����
        ctx.moveTo(w, 0);
        ctx.lineTo(w, canvas_h);
        ctx.stroke() ;  //�`��
    }
    //�i�q �� ��
    function lattice_line_width() {
        ctx.beginPath();
        ctx.strokeStyle = "silver" //�F
        ctx.lineWidth = 0.4; //����
        ctx.moveTo(0, h);
        ctx.lineTo(canvas_w, h);
        ctx.stroke() ;  //�`��
    }
    //�i�q �� �� ����
    function lattice_line_width_thick() {
        ctx.beginPath();
        ctx.strokeStyle = "gray" //�F
        ctx.lineWidth = 0.6; //����
        ctx.moveTo(0, h);
        ctx.lineTo(canvas_w, h);
        ctx.stroke() ;  //�`��
    }
}

// �}�E�X�z�C�[�����������Ƃ�
function canvasZoom(e) { 
    if (e.wheelDelta > 0) {
        if(scale_col < scale_col_max && scale_row < scale_row_max){
            scale_col += scale_step_col; 
            scale_row += scale_step_row;
            mag = Math.round( (scale_row / (scale_row - scale_step_row)) * 100) / 100; // 1�O�Ƃ̔�r�{���@2, 1.5 ...
            //console.log("mag = " + mag);
            lattice();
            //console.log(scale_col);
            draw_scale();
            if(arrange_flag === 1){
                draw_canvas_arrange();
	        }else{
                draw_canvas();
            }
        }
    }else if(e.wheelDelta < 0 && scale_col > scale_col_min && scale_row > scale_row_min) {
        scale_col -= scale_step_col;
        scale_row -= scale_step_row;
        mag = 1 / (Math.round( ((scale_row + scale_step_row )/ scale_row) * 100) / 100);
        //console.log("mag = " + 1/mag);
        lattice();
        draw_scale();
        if(arrange_flag === 1){
            draw_canvas_arrange();
	    }else{
            draw_canvas();
        }
    }
}

// �X�P�[���`��
let scale_x = 0, scale_y = 0; // �X�P�[���������ʒu
let scale_col = 20; // �J�n���̃X�P�[��
let scale_row = 45; 
let scale_col_value = 0, scale_row_value = 0; // �`�悷��X�P�[���̒l
let scale_interval_col = 0, scale_interval_row = 0; // �`�悷��X�P�[���̒l�̍� 4,8,12 = 4
const scale_step_col = 4; // �X�e�b�v�X�P�[��
const scale_step_row = 9;
const scale_col_max = 40; // ����X�P�[��
const scale_row_max = 90;
const scale_col_min = 4;  // �����X�P�[��
const scale_row_min = 9;
function draw_scale() { // scale_col,row  scale_step_col,row
    scale_interval_col = scale_col / scale_step_col; // ���̒l�̊Ԋu
    scale_interval_row = scale_row / scale_step_row;
    scale_col_value = parseInt((lattice_col_count + 3) / 5) * scale_interval_col;
    scale_row_value = parseInt((lattice_row_count + 3) / 5) * scale_interval_row;
    scale_x = 40;
    for ( scale_y = canvas_h - 100 + Math.abs(lattice_col) + ((lattice_col_count + 3) % 5 ) * 20; scale_y > 0; scale_y -= 100) { // ��i���j
        draw_scale_col();
        scale_col_value�@+= scale_interval_col;
    }
    scale_y = 460;
    for ( scale_x = 100 - Math.abs(lattice_row) - ((lattice_row_count + 3) % 5 ) * 20; scale_x < canvas_w; scale_x += 100) { // �s�i�A���[�j
        draw_scale_row();
        scale_row_value�@+= scale_interval_row;
    }

    function draw_scale_col() { // �X�P�[������������
        ctx.beginPath(); // �����l�p�i�w�i�j
        ctx.fillStyle = "white" ;
        ctx.rect( scale_x -16, scale_y -9, 12, 12 );
        ctx.fill();
        ctx.beginPath(); // ��
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 0.6;
        ctx.moveTo(scale_x -16, scale_y);
        ctx.lineTo(scale_x -4, scale_y);
        ctx.stroke() ;
        ctx.beginPath(); // ����
        ctx.font = "12px";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(scale_col_value, scale_x -10, scale_y +3);
    }
    function draw_scale_row() { // �X�P�[������������
        ctx.beginPath(); // �����l�p�i�w�i�j
        ctx.fillStyle = "white" ;
        ctx.rect( scale_x -6, scale_y +4, 12, 12 );
        ctx.fill();
        ctx.beginPath(); // ��
        ctx.strokeStyle = "gray";
        ctx.lineWidth = 0.6;
        ctx.moveTo(scale_x , scale_y +4);
        ctx.lineTo(scale_x, scale_y +16);
        ctx.stroke();
        ctx.beginPath(); // ����
        ctx.font = "12px";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(scale_row_value, scale_x , scale_y +12);
    }
}
// Cnavas��ł̓u���E�U�̃X�N���[���𖳌���
function disableScroll() {document.addEventListener("mousewheel", scrollControl, { passive: false });}
function enableScroll() {document.removeEventListener("mousewheel", scrollControl, { passive: false });}
function scrollControl(e) {e.preventDefault();}

let save_count = 0; //�Z�[�u��
let save_max_count = 0; //�Z�[�u�񐔂̍ő�l
let save_mode = []; // ���[�h�̔z��
let save_mode_before = []; // �o�b�N�������[�h�̔z��
let store_x_before = []; // �o�b�N�����X�܂̔z��x
let store_y_before = []; // �o�b�N�����X�܂̔z��y
let device_x_before = []; // �o�b�N�����q�@�̔z��x
let device_y_before = []; // �o�b�N�����q�@�̔z��y
let wall_x_before = []; // �o�b�N�����ǂ̔z��x
let wall_y_before = []; // �o�b�N�����ǂ̔z��y
let desk_x_before = []; // �o�b�N�������̔z��x
let desk_y_before = []; // �o�b�N�������̔z��y
let chair_x_before = []; // �o�b�N�����֎q�̔z��x
let chair_y_before = []; // �o�b�N�����֎q�̔z��y

const img = new Image(); //�摜
//�i�摜�j�Z�[�u
function save() {
    save_count += 1;
    save_max_count = save_count;
    save_mode[save_count] = mode; // save_mode[0] = empty
    // �o�b�N�����z��̍폜
    save_mode_before.length = 0; 
    store_x_before.length = 0; 
    store_y_before.length = 0; 
    device_x_before.length = 0; 
    device_y_before.length = 0; 
    wall_x_before.length = 0;
    wall_y_before.length = 0;
    desk_x_before.length = 0;
    desk_y_before.length = 0;
    chair_x_before.length = 0;
    chair_y_before.length = 0;
    //console.log(save_count)
}

//�߂�
function back () {
    if(save_count > 0){ // �摜�̕ύX
        if( save_mode[save_count] === "store"){
            store_x_before.push(store_x.slice(-1)[0]);
            store_y_before.push(store_y.slice(-1)[0]);
            store_x.pop();
            store_y.pop();
            store_flag = 0;
            store_click_count -= 1;
        }
        else if( save_mode[save_count] === "device"){
            device_x_before.push(device_x.slice(-1)[0]);
            device_y_before.push(device_y.slice(-1)[0]);
            device_x.pop();
            device_y.pop();
            device_click_count -= 1;
        }
        else if( save_mode[save_count] === "wall"){
            wall_x_before.push(wall_x.slice(-1)[0]);
            wall_y_before.push(wall_y.slice(-1)[0]);
            wall_x.pop();
            wall_y.pop();
            wall_click_count -= 1;
        }
        else if( save_mode[save_count] === "desk"){
            desk_x_before.push(desk_x.slice(-1)[0]);
            desk_y_before.push(desk_y.slice(-1)[0]);
            desk_x.pop();
            desk_y.pop();
            desk_click_count -= 1;
        }
        else if( save_mode[save_count] === "chair"){
            chair_x_before.push(chair_x.slice(-1)[0]);
            chair_y_before.push(chair_y.slice(-1)[0]);
            chair_x.pop();
            chair_y.pop();
            chair_click_count -= 1;
        }
        save_mode_before.push(save_mode.slice(-1)[0]);
        save_mode.pop();
        save_count -= 1;
        lattice();
        draw_scale();
        if(arrange_flag === 1){
            draw_canvas_arrange();
	    }else{
            draw_canvas();
        }
    }
}

//�i��
function forward () {
    if(save_count < save_max_count){
        save_count += 1;
        save_mode.push(save_mode_before.slice(-1)[0]);
        save_mode_before.pop();
        if( save_mode[save_count] === "store"){
            store_x.push(store_x_before.slice(-1)[0]);
            store_y.push(store_y_before.slice(-1)[0]);
            store_x_before.pop();
            store_y_before.pop();
            store_click_count += 1;
            if ( store_click_count >= 3 && store_x.slice(0,1)[0] === store_x.slice(-1)[0] && store_y.slice(0,1)[0] === store_y.slice(-1)[0] && store_flag != 1 ){ // �l�p�`�ȏ�ɂȂ�Ƃ�
                store_flag = 1;
            }
        }
        else if( save_mode[save_count] === "device"){
            device_x.push(device_x_before.slice(-1)[0]);
            device_y.push(device_y_before.slice(-1)[0]);
            device_x_before.pop();
            device_y_before.pop();
            device_click_count += 1;
		}
        else if( save_mode[save_count] === "wall"){
            wall_x.push(wall_x_before.slice(-1)[0]);
            wall_y.push(wall_y_before.slice(-1)[0]);
            wall_x_before.pop();
            wall_y_before.pop();
            wall_click_count += 1;
		}
        else if( save_mode[save_count] === "desk"){
            desk_x.push(desk_x_before.slice(-1)[0]);
            desk_y.push(desk_y_before.slice(-1)[0]);
            desk_x_before.pop();
            desk_y_before.pop();
            desk_click_count += 1;
		}
        else if( save_mode[save_count] === "chair"){
            chair_x.push(chair_x_before.slice(-1)[0]);
            chair_y.push(chair_y_before.slice(-1)[0]);
            chair_x_before.pop();
            chair_y_before.pop();
            chair_click_count += 1;
		}
        lattice();
        draw_scale();
        if(arrange_flag === 1){
            draw_canvas_arrange();
	    }else{
            draw_canvas();
        }
	
    }
}

//�ۑ�
/*
const out = document.getElementById( "out" );
const ow = out.width;
const oh = out.height;
const ctx_ = out.getContext( "2d" );
ctx_.beginPath(); //�����l�p�i�w�i�j
ctx_.fillStyle = "white" ;
ctx_.rect( 0, 0, ow, oh ) ;
ctx_.fill() ;
*/
function chg_img(){
�@�@if(store_flag === 1){
        center_move();
        let chg_img_x = [], chg_img_y = [];
        for (let i=0; i < store_x.length ; i++){
            chg_img_x[i] = Math.round(store_x[i] / scale_row * scale_step_row * 100 + 40  - total_move_dis_x);
        }
        for (i=0; i < store_y.length ; i++){
            chg_img_y[i] = Math.round(460 - store_y[i] / scale_col * scale_step_col * 100 + total_move_dis_y);
        }
        const Max = function (a, b) {return Math.max(a, b);}
        const Min = function (a, b) {return Math.min(a, b);}
        let crip_x = chg_img_x.reduce(Min);
        let crip_y = chg_img_y.reduce(Max);
        let crip_w = chg_img_x.reduce(Max) - crip_x;
        let crip_h = crip_y - chg_img_y.reduce(Min);
        ctx.drawImage( canvas, crip_x, crip_y, crip_img_w, crip_img_h, 0, 0, canvas_w, crip_img_h * (canvas_w/crip_img_w)); // ���摜x,y,w,h �\��t��x,y,w,h
        /*
        let chg_img_x = [], chg_img_y = [];
        for (let i=0; i < store_x.length ; i++){
            chg_img_x[i] = Math.round(store_x[i] / scale_row * scale_step_row * 100 + 40  - total_move_dis_x);
        }
        for (i=0; i < store_y.length ; i++){
            chg_img_y[i] = Math.round(460 - store_y[i] / scale_col * scale_step_col * 100 + total_move_dis_y);
        }
        const Max = function (a, b) {return Math.max(a, b);}
        const Min = function (a, b) {return Math.min(a, b);}
        let max_x = chg_img_x.reduce(Max);
        let min_x = chg_img_x.reduce(Min);
        let max_y = chg_img_y.reduce(Max);
        let min_y = chg_img_y.reduce(Min);
        let crip_img_w = max_x - min_x +40;
        let crip_img_h = max_y - min_y +40;
        const img = new Image() ;
        img.src = canvas.toDataURL();
        ctx.beginPath();
        img.onload = function(){
            if(crip_img_w >= crip_img_h){
                ctx.drawImage( img, min_x -20, min_y -20, crip_img_w, crip_img_h, 0, 0, canvas_w, crip_img_h * (canvas_w/crip_img_w)); // ���摜x,y,w,h �\��t��x,y,w,h
            }
            else{
                ctx.drawImage( img, min_x -20, min_y -20, crip_img_w, crip_img_h, 0, 0, crip_img_w * (canvas_h/crip_img_h) , canvas_h); // ���摜x,y,w,h �\��t��x,y,w,h
            }
        }
        */
        document.getElementById("drawingImage_Data").value = canvas.toDataURL();
        //
    }
}

var val = document.getElementById("business_status_Data_No").value
var select = document.getElementById("business_status_Data");
if(val === "�c�ƒ�"){
    select.options[1].selected = true
}
else if(val === "������"){
    select.options[2].selected = true
}
else if(val === "�x�ƒ�"){
    select.options[3].selected = true
}else{
    select.options[0].selected = true
}

function doPreSubmit(){
    chg_img();
}

blob();
function blob(){
    var base64 = canvas.toDataURL('image/png');
    var request = {
    url: 'http://localhost:4567/base64',
    method: 'POST',
    params: {
        image: base64.replace(/^.*,/, '')
    },
    success: function (response) {
        console.log(response.responseText);
    }
    };
    //Ext.Ajax.request(request);
}