import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostItemComponent } from './post-item/post-item.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostDetailsComponent,
    PostItemComponent,
    PostListComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    SharedModule,
  ],
})
export class BlogModule {}
