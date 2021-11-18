import { CommonModule } from '@angular/common';
import { Compiler, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ModuleWithComponentFactories, NgModule, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicTemplateRendererService {

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private compiler: Compiler) {
  }

  compileTemplate(template: string, container: ViewContainerRef,componentClass?: any) {

      let metadata = {
          selector: `runtime-component-sample`,
          template: template
      };

      let factory = this.createComponentFactorySync(this.compiler, metadata, componentClass);
      
 
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
