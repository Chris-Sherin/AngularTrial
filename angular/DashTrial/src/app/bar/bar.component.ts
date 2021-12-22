import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
 

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
   
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 500 - (this.margin * 2);

  constructor() {
    
   }
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Narration))
  .padding(0.5);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 250000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: { Narration: string; }) => x(d.Narration))
  .attr("y", (d: { ClosingBalance: d3.NumberValue; }) => y(d.ClosingBalance))
  .attr("width", x.bandwidth())
  .attr("height", (d: { ClosingBalance: d3.NumberValue; }) => this.height - y(d.ClosingBalance))
  .attr("fill", "#d04a35");
}

  ngOnInit(): void {
    this.createSvg();
    d3.csv("/assets/frameworks.csv").then(data => this.drawBars(data));

}}
