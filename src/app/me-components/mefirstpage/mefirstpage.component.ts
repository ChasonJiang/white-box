import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TESTS } from './moke-test';
@Component({
  selector: 'app-mefirstpage',
  templateUrl: './mefirstpage.component.html',
  styleUrls: ['./mefirstpage.component.scss'],
})





export class MefirstpageComponent implements OnInit {

  tests=TESTS;

  constructor() { }

  ngOnInit() {}




}
