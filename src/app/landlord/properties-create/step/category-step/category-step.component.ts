import {Component, EventEmitter, inject, input, Input, InputSignal, OnDestroy, OnInit, Output} from '@angular/core';
import {Category, CategoryName} from "../../../../layout/navbar/category/category.model";
import {CategoryComponent} from "../../../../layout/navbar/category/category.component";
import {CategoryService} from "../../../../layout/navbar/category/category.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-category-step',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './category-step.component.html',
  styleUrl: './category-step.component.scss'
})
export class CategoryStepComponent implements OnInit, OnInit {


  /*@Input() categoryName!: CategoryName;
  @Output() stepValidityChange = new EventEmitter<boolean>();
  @Output() categoryChange = new EventEmitter<"ALL" | "AMAZING_VIEWS" | "OMG" | "TREEHOUSES" | "BEACH" | "FARMS" | "TINY_HOMES" | "LAKE" | "CONTAINERS" | "CAMPING" | "CASTLE" | "SKIN" | "SKING" | "CAMPERS" | "ARTIC" | "BOAT" | "BED_AND_BREAKFASTS" | "ROOMS" | "EARTH_HOMES" | "TOWER" | "CAVES" | "LUXES" | "CHEFS_KITCHEN">();
*/

  categoryName: InputSignal<CategoryName>=input.required<CategoryName>();

  @Output()
  categoryChange :EventEmitter<CategoryName>= new EventEmitter<CategoryName>();

  @Output()
  stepValidityChange : EventEmitter<boolean>=new EventEmitter<boolean>();

  categoryService: CategoryService= inject(CategoryService);
  categories:Category[] | undefined;

  ngOnInit(): void {
    this.categories=this.categoryService.getCategories();

  }

  onSelectCategory(newCategory:CategoryName): void {
    this.categoryChange.emit (newCategory);
    this.stepValidityChange.emit(true);
  }

  protected readonly CategoryComponent = CategoryComponent;
}
