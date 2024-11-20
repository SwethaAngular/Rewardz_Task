import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  // @ViewChild('sortPanel') sortPanel!: MatDrawer;
  selectedSortOption: string = 'asc';
  categories = [
    {
      name: 'e-Voucher',
      subCategories: [
        { name: 'Amazon', selected: false },
        { name: 'Flipkart', selected: false },
      ],
    },
    {
      name: 'Products',
      subCategories: [
        { name: 'Electronics', selected: false },
        { name: 'Fashion', selected: false },
      ],
    },
  ];
  products = [
    { name: 'Test Reward', image: './../assets/image/product/camera.png', points: 0, outOfStock: true,category:"Amazon" },
    { name: 'Dairy Farm $20', image: './../assets/image/product/TV.png', points: 2,category:"Electronics" },
    { name: 'Qoo10 $5', image: './../assets/image/product/cream.png', points: 10, outOfStock: true,category:"Fashion" },
    { name: 'Test Reward', image: './../assets/image/product/camera.png', points: 0, outOfStock: true,category:"Amazon" },
    { name: 'Dairy Farm $20', image: './../assets/image/product/TV.png', points: 2,category:"Electronics" },
    { name: 'Qoo10 $5', image: './../assets/image/product/cream.png', points: 10, outOfStock: true,category:"Flipkart" },
    { name: 'Test Reward', image: './../assets/image/product/camera.png', points: 0, outOfStock: true,category:"Amazon" },
    { name: 'Dairy Farm $20', image: './../assets/image/product/TV.png', points: 2,category:"Electronics" },
    { name: 'Qoo10 $5', image: './../assets/image/product/cream.png', points: 10, outOfStock: true,category:"Fashion" },
    { name: 'Test Reward', image: './../assets/image/product/camera.png', points: 0, outOfStock: true,category:"Flipkart" },
    { name: 'Dairy Farm $20', image: './../assets/image/product/TV.png', points: 2,category:"Flipkart" },
    { name: 'Qoo10 $5', image: './../assets/image/product/cream.png', points: 10, outOfStock: true,category:"Fashion" },
  ];
  filteredProducts = [...this.products];
  appliedFilters: string[] = [];

  number:any;
  ngOnInit(): void {
   
  }
  setSortOption(option: string) {
    this.selectedSortOption = option; // Update the currently selected option
    // You can also add any logic for sorting here
  }

  // onCategoryChange(category: any) {
  //   if (category.selected) {
  //     this.appliedFilters.push(category.name);
  //     this.filteredProducts = this.products.filter((product) => {
  //       // Logic for applying filters
  //       return this.appliedFilters.every((filter) =>
  //         product.category.toLowerCase().includes(filter.toLowerCase())
  //       );
  //     });
  //   } else {
     
  //     this.appliedFilters = this.appliedFilters.filter(
  //       (filter) => filter !== category.name
       
  //     );
  //   }
  //   // this.applyFilters();
  // }

  onCategoryChange(category: any) {
    if (category.selected) {
      // If category is selected, add to appliedFilters
      this.appliedFilters.push(category.name);
    } else {
      // If category is unselected, remove from appliedFilters
      this.appliedFilters = this.appliedFilters.filter(filter => filter !== category.name);
    }
  
    // Apply filters based on selected categories
    this.filterProducts();
  }
  
  filterProducts() {
    // If no filters are applied, show all products
    if (this.appliedFilters.length === 0) {
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on any of the selected categories
      this.filteredProducts = this.products.filter(product => {
        return this.appliedFilters.some(filter => 
          product.category.toLowerCase().includes(filter.toLowerCase())
        );
      });
    }
  }
  
  

  onSearch(event: any) {
    console.log(event);
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }

  clearFilters() {
    this.appliedFilters = [];
    this.categories.forEach((category) =>
      category.subCategories.forEach((sub) => (sub.selected = false))
    );
    this.applyFilters();
  }

  removeFilter(filter: string) {
    console.log(filter);
    
    this.appliedFilters = this.appliedFilters.filter((f) => f !== filter);
    this.categories.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        if (subCategory.name === filter) {
          subCategory.selected = false; 
        }
      });
    })
    this.filterProducts();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((product) => {
      // Logic for applying filters
      return this.appliedFilters.every((filter) =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  sort(order: 'asc' | 'desc') {
    this.filteredProducts.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  resetSort() {
    this.filteredProducts = [...this.products];
  }

  applySort() {
    if (this.selectedSortOption === 'asc') {
      this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    // Automatically close the panel after sorting
  }
 
  
}
