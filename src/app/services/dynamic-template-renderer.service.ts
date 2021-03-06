import { CommonModule } from '@angular/common';
import { Type } from '@angular/compiler';
import { Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ModuleWithComponentFactories, NgModule, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicTemplateRendererService {
  // 动态编译 https://segmentfault.com/a/1190000014688076
  // https://heptaluan.github.io/2019/05/12/Angular/08/
  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private compiler: Compiler) {
  }

  compileTemplate(componentMetaData: Component, container: ViewContainerRef,componentClass?: any) {

      let factory = this.createComponentFactorySync(this.compiler, componentMetaData, componentClass);
      
 
      return container.createComponent(factory);
  }

  private createComponentFactorySync(compiler: Compiler, metadata: Component, componentClass: any): ComponentFactory<any> {
      const cmpClass = componentClass || class RuntimeComponent {};
      const decoratedCmp = Component(metadata)(cmpClass);

      @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
      class RuntimeComponentModule { }

      let module: ModuleWithComponentFactories<any> = compiler.compileModuleAndAllComponentsSync(RuntimeComponentModule);
      return module.componentFactories.find(f => f.componentType === decoratedCmp);
  }

}
