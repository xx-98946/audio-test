<template>
  <div>
    <button @click="open">开启摄像头</button>
    <button @click="close">关闭摄像头</button>
    <video ref="refVideo" controls></video>
    <audio ref="refAudio" controls></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

const refVideo = ref(null);
const refAudio = ref("");
const stream = ref(null);

const close = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop()); // 遍历并停止所有轨道
    refVideo.srcObject = null; // 清空video元素的源
    refAudio.srcObject = null; // 清空audio元素的源
  }
};

const open = async () => {
  const res = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  stream.value = res;
  refVideo.value.srcObject = res;
  refAudio.value.srcObject = res;

  // // videoSrc.value =
  // const url = "/api";

  const voicePlayer = new ZLMRTCClient.Endpoint({
    element: refVideo.value,
    debug: true, // 是否打印日志
    zlmsdpUrl: url, //流地址
    simulcast: false,
    useCamera: false,
    audioEnable: true,
    videoEnable: false,
    recvOnly: false,
    // resolution:{w,h},
    usedatachannel: false,
  });
};
</script>

<style scoped>
video {
  border: 1px solid black;
  width: 400px;
  height: 400px;
  transform: rotateY(180deg);
}
</style>
