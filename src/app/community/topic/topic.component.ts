import { Component, Input, OnInit } from '@angular/core';
import { TopicCard } from 'src/app/interface/Topic';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topicCard:TopicCard;
  
  constructor() { }

  ngOnInit() {}

}
