import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'blog',
    children: [
      { path: '', pathMatch: 'full', component: PostListComponent },
      {
        path: 'create',
        component: PostCreateComponent,
        canActivate: [AuthActivate],
      },
      { path: ':postId/details', component: PostDetailsComponent },
      {
        path: ':postId/edit',
        component: PostEditComponent,
        canActivate: [AuthActivate],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
