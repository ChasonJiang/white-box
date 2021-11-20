import { AnimationController } from '@ionic/angular';

export function ModalFromBottomEnter(animationCtrl: AnimationController,baseEl: any){
    // 背景动画
    const backdropAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .beforeStyles({ 'z-index': 0, opacity: 0.3, visibility: 'visible' })
    // 主wrapper的动画配置
    const wrapperAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .beforeStyles({ height: '60%', position: 'absolute', bottom: 0})
        .fromTo('transform', 'translateY(100%)', 'translateY(0)');

    return animationCtrl.create()
        .duration(300)
        .easing('ease')
        .addAnimation([backdropAnimation,wrapperAnimation]);
    }
        
export function ModalFromBottomLeave(animationCtrl: AnimationController,baseEl: any){
    // 背景动画
    const backdropAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .beforeStyles({ visibility: 'hidden' });
    // 主wrapper的动画配置
    const wrapperAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper'))
        .fromTo('transform', 'translateY(0)', 'translateY(100%)');

    return animationCtrl.create()
        .duration(300)
        .easing('ease')
        .addAnimation([backdropAnimation,wrapperAnimation]);

}
           

