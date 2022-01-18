if [ ! -f services/recog/model/r100-glint300k.onnx ]; then
echo 'download'
curl -L https://github.com/wanghsinche/action-practise/releases/download/model.onnx-20220106-011404/r100-glint300k.onnx -o services/recog/model/r100-glint300k.onnx
fi

if [ ! -f services/recog/model/bernoullinb_R100_Glint360K_XSList-full.onnx ]; then
echo 'download'
curl -L https://github.com/wanghsinche/action-practise/releases/download/model.onnx-20220106-011404/bernoullinb_R100_Glint360K_XSList-full.onnx -o services/recog/model/bernoullinb_R100_Glint360K_XSList-full.onnx
fi

ls services/recog/model/*.onnx -Rl