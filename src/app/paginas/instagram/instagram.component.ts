import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  profileData: any = {}; 
  posts: any[] = []; 
  accessToken = 'OCAfZBBWcrwDzaZBFMkOUW4gjYSg6ZBgyLRVi3JVw14iaL8Ckk2XZB3Uq2dqEZCZAWhFWdzlwmvafRYSNZB2QZCJT1jicWpQl2ltyXBSA6hSgdLAZDZD'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Endpoint para obter informações do perfil
    const profileUrl = `https://graph.instagram.com/me?fields=id,username,media_count&access_token=${this.accessToken}`;

    // Requisição para obter dados do perfil
    this.http.get<any>(profileUrl).subscribe(data => {
      this.profileData = data;
    });

    // Endpoint para obter postagens do perfil
    const postsUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=${this.accessToken}`;
    
    // Requisição para obter postagens do perfil
    this.http.get<any>(postsUrl).subscribe(data => {
      this.posts = data.data;
    });
  }

}
