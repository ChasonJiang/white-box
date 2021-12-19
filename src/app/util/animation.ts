import { AnimationController } from '@ionic/angular';


export function MyAnimation(animationCtrl:AnimationController){
    const enterAnimation = (baseEl: any) => {
        const backdropAnimation = animationCtrl.create()
          .addElement(baseEl.querySelector('ion-backdrop')!)
          .fromTo('opacity', '0.01', 'var(--backdrop-opacity)')
          .beforeStyles({'z-index': 0, 'opacity': 0.3, 'visibility': 'visible'});
  
        const wrapperAnimation = animationCtrl.create()
          .addElement(baseEl.querySelector('.modal-wrapper')!)
          .keyframes([
            {offset: 0,transform: 'translateX(100%)'},
            {offset: 1,transform: 'translateX(0%)'},
          ])
          .beforeStyles({
            'width': '100%',
            'height': '100%',
            'opacity': 1,
          });
  
        const contentAnimation = animationCtrl.create()
          .addElement(baseEl.querySelector('ion-content.content'))
          .beforeStyles({
            'width': '100%',
            'height': '100%',
            'opacity': 1,
          });
  
      return animationCtrl.create()
        .addElement(baseEl)
        .duration(300)
        .easing('cubic-bezier(.25, .1, .25, 1)')
        .addAnimation([backdropAnimation, wrapperAnimation,contentAnimation]);
    }
  
    const leaveAnimation = (baseEl: any) => {
        const backdropAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .keyframes([
          {offset: 0,opacity:0.3 },
          {offset: 1,opacity:0}
        ])
        // .beforeStyles({'visibility': 'hidden'});
  
        const wrapperAnimation = animationCtrl.create()
            .addElement(baseEl.querySelector('.modal-wrapper')!)
            .keyframes([
              {offset: 0,opacity:1 ,transform: 'translateX(0%)'},
              {offset: 1,opacity:1 ,transform: 'translateX(100%)'},
            ])
  
    return animationCtrl.create()
        .addElement(baseEl)
        .duration(300)
        .easing('cubic-bezier(.25, .1, .25, 1)')
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    return {
        EnterAnimation:enterAnimation,
        LeaveAnimation:leaveAnimation
    }

}

export function CommentEditerAnimation(animationCtrl:AnimationController){
    const enterAnimation = (baseEl: any) => {
        const backdropAnimation = animationCtrl.create()
            .addElement(baseEl.querySelector('ion-backdrop')!)
            .keyframes([
                {offset: 0, opacity:0,transform: 'translateY(0%)'},
                {offset: 1, opacity:0.3,transform: 'translateY(0%)'},
            ])
            .afterStyles({
                opacity: 0.3
              });
        const wrapperAnimation = animationCtrl.create()
          .addElement(baseEl.querySelector('.modal-wrapper')!)
          .keyframes([
            {offset: 0,transform: 'translateY(100%)'},
            {offset: 1,transform: 'translateY(0%)'},
          ])
          .beforeStyles({
            'width': '100%',
            'height': '100%',
            'opacity': 1,
          });
  
        const contentAnimation = animationCtrl.create()
          .addElement(baseEl.querySelector('ion-content.content'))
          .beforeStyles({
            'width': '100%',
            'height': '100%',
            'opacity': 1,
          });
  
      return animationCtrl.create()
        .addElement(baseEl)
        .duration(300)
        .easing('cubic-bezier(.25, .1, .25, 1)')
        .addAnimation([backdropAnimation, wrapperAnimation,contentAnimation]);
    }
  
    const leaveAnimation = (baseEl: any) => {
        const backdropAnimation = animationCtrl.create()
        .addElement(baseEl.querySelector('ion-backdrop')!)
        .keyframes([
          {offset: 0,opacity:0.3 },
          {offset: 1,opacity:0}
        ])
  
        const wrapperAnimation = animationCtrl.create()
            .addElement(baseEl.querySelector('.modal-wrapper')!)
            .keyframes([
              {offset: 0,opacity:1 ,transform: 'translateY(0%)'},
              {offset: 1,opacity:1 ,transform: 'translateY(100%)'},
            ])
  
    return animationCtrl.create()
        .addElement(baseEl)
        .duration(300)
        .easing('cubic-bezier(.25, .1, .25, 1)')
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

    return {
        EnterAnimation:enterAnimation,
        LeaveAnimation:leaveAnimation
    }

}