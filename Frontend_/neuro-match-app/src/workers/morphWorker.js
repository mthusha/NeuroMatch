/* eslint-disable no-restricted-globals */

self.onmessage = (e) => {
  const { audioBase64 } = e.data;

  const dummyMorphs = {
    Wolf3D_Head: Array(10).fill(Math.random()),
    EyeLeft: Array(5).fill(Math.random()),
    EyeRight: Array(5).fill(Math.random()),
    Wolf3D_Teeth: Array(3).fill(Math.random()),
  };

  self.postMessage({ updates: dummyMorphs });

  setTimeout(() => self.onmessage(e), 50);
};
