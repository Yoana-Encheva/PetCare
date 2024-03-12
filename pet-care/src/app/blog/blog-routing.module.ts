import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {
    path: 'blog',
    children: [
      { path: '', pathMatch: 'full', component: PostListComponent },
      { path: ':postId/details', component: PostDetailsComponent },
      { path: 'create', component: PostCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
