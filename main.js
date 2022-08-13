
let detections;
const ww = 640, wh = 480;
const videoElement = document.getElementsByClassName('input_video')[0];

let near_x = 0; 
let near_y = 0;

function onResults(results) {
  detections = results;

  //  console.log(detections)

  let landmarks_info_x = [];
  let landmarks_info_y = [];
  let hand_type;
  let landmarks_info_push;
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      landmarks_info_x.push(landmarks[0].x * ww, landmarks[1].x * ww, 
        landmarks[2].x * ww, landmarks[3].x * ww, landmarks[4].x * ww, 
        landmarks[5].x * ww, landmarks[6].x * ww, landmarks[7].x * ww,
        landmarks[8].x * ww, landmarks[9].x * ww, landmarks[10].x * ww, 
        landmarks[11].x * ww, landmarks[12].x * ww, landmarks[13].x * ww, 
        landmarks[14].x * ww, landmarks[15].x * ww, landmarks[16].x * ww, 
        landmarks[17].x * ww, landmarks[18].x * ww, landmarks[19].x * ww, 
        landmarks[20].x * ww);


      landmarks_info_y.push(landmarks[0].y * wh, landmarks[1].y * wh, 
        landmarks[2].y * wh, landmarks[3].y * wh, landmarks[4].y * wh, 
        landmarks[5].y * wh, landmarks[6].y * wh, landmarks[7].y * wh,
        landmarks[8].y * wh, landmarks[9].y * wh, landmarks[10].y * wh, 
        landmarks[11].y * wh, landmarks[12].y * wh, landmarks[13].y * wh, 
        landmarks[14].y * wh, landmarks[15].y * wh, landmarks[16].y* wh, 
        landmarks[17].y * wh, landmarks[18].y * wh, landmarks[19].y * wh, 
        landmarks[20].y * wh);
      
      let landmarks_info = {
        0: [landmarks_info_x[0], landmarks_info_y[0]],  
        1: [landmarks_info_x[1], landmarks_info_y[1]], 
        2: [landmarks_info_x[2], landmarks_info_y[2]], 
        3: [landmarks_info_x[3], landmarks_info_y[3]], 
        4: [landmarks_info_x[4], landmarks_info_y[4]], 
        5: [landmarks_info_x[5], landmarks_info_y[5]], 
        6: [landmarks_info_x[6], landmarks_info_y[6]], 
        7: [landmarks_info_x[7], landmarks_info_y[7]], 
        8: [landmarks_info_x[8], landmarks_info_y[8]], 
        9: [landmarks_info_x[9], landmarks_info_y[9]], 
        10: [landmarks_info_x[10], landmarks_info_y[10]], 
        11: [landmarks_info_x[11], landmarks_info_y[11]], 
        12: [landmarks_info_x[12], landmarks_info_y[12]], 
        13: [landmarks_info_x[13], landmarks_info_y[13]], 
        14: [landmarks_info_x[14], landmarks_info_y[14]], 
        15: [landmarks_info_x[15], landmarks_info_y[15]], 
        16: [landmarks_info_x[16], landmarks_info_y[16]], 
        17: [landmarks_info_x[17], landmarks_info_y[17]], 
        18: [landmarks_info_x[18], landmarks_info_y[18]], 
        19: [landmarks_info_x[19], landmarks_info_y[19]], 
        20: [landmarks_info_x[20], landmarks_info_y[20]]}
        landmarks_info_push = landmarks_info;}}

    if (results.multiHandLandmarks) {
      for (const label of results.multiHandedness) {
        hand_type = label.label;}}

    let finger_motion_thmb = [];
    let finger_motion_pnt = [];
    let finger_motion_mid = [];
    let finger_motion_rng = [];
    let finger_motion_pnky = [];
    let xy_x;
    let xy_y;

      if (hand_type === 'Right') {
        if (landmarks_info_push[4][0] >= landmarks_info_push[1][0]){
          finger_motion_thmb.push(1);
      } else {
        finger_motion_thmb.push(0);
      }}

      if (hand_type === 'Left') {
        if (landmarks_info_push[4][0] <= landmarks_info_push[1][0]){
          finger_motion_thmb.push(1);
      } else {
        finger_motion_thmb.push(0);
      }}

      if (hand_type === 'Left' || hand_type === 'Right') {
        if (landmarks_info_push[8][1] >= landmarks_info_push[7][1]){
          finger_motion_pnt.push(1);
      } else {
        finger_motion_pnt.push(0);
      }}

      if (hand_type === 'Left' || hand_type === 'Right') {
        if (landmarks_info_push[12][1] >= landmarks_info_push[11][1]){
          finger_motion_mid.push(1);
      } else {
        finger_motion_mid.push(0);
      }}

      if (hand_type === 'Left' || hand_type === 'Right') {
        if (landmarks_info_push[16][1] >= landmarks_info_push[15][1]){
          finger_motion_rng.push(1);
      } else {
        finger_motion_rng.push(0);
      }}

      if (hand_type === 'Left' || hand_type === 'Right') {
        if (landmarks_info_push[20][1] >= landmarks_info_push[19][1]){
          finger_motion_pnky.push(1);
      } else {
        finger_motion_pnky.push(0);
      }}

      if (hand_type === 'Left' || hand_type === 'Right') {
        const cursor = document.querySelector(".cursor");
      
        let x = ((-1 * landmarks_info_push[10][0]) + 640) * 3.5;
        let y = landmarks_info_push[10][1] * 3;

        const close_value = 10
        near_x = near_x + (x - near_x) / close_value;
        near_y = near_y + (y - near_y) / close_value;
      
        cursor.style.top = near_y + "px";
        cursor.style.left = near_x + "px";
        cursor.style.display = "block";     
      }
  console.log(finger_motion_thmb,
    finger_motion_pnt,
    finger_motion_mid,
    finger_motion_rng,
    finger_motion_pnky)
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 0,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 640,
  height: 480
});

camera.start();