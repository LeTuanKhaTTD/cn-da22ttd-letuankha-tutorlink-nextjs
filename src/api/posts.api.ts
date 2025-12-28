/**
 * ============================================
 * POSTS API
 * API calls cho posts (bài đăng tìm gia sư)
 * ============================================
 */

import { api } from './axios'
import { API_ENDPOINTS } from '@/config'
import type { Post, CreatePostData, PostFilter, Application, PaginatedResponse } from '@/types'

export const postsApi = {
  // Get posts list
  getPosts: async (filters: PostFilter): Promise<PaginatedResponse<Post>> => {
    const response = await api.get(API_ENDPOINTS.POSTS.LIST, { params: filters })
    return response.data
  },

  // Get post by ID
  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get(API_ENDPOINTS.POSTS.GET_BY_ID(id))
    return response.data
  },

  // Create post
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post(API_ENDPOINTS.POSTS.CREATE, data)
    return response.data
  },

  // Update post
  updatePost: async (id: string, data: Partial<CreatePostData>): Promise<Post> => {
    const response = await api.put(API_ENDPOINTS.POSTS.UPDATE(id), data)
    return response.data
  },

  // Delete post
  deletePost: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.POSTS.DELETE(id))
  },

  // Get my posts (parent's posts)
  getMyPosts: async (): Promise<Post[]> => {
    const response = await api.get(API_ENDPOINTS.POSTS.MY_POSTS)
    return response.data
  },
}

export const applicationsApi = {
  // Get applications list
  getApplications: async (): Promise<Application[]> => {
    const response = await api.get(API_ENDPOINTS.APPLICATIONS.LIST)
    return response.data
  },

  // Get application by ID
  getApplicationById: async (id: string): Promise<Application> => {
    const response = await api.get(API_ENDPOINTS.APPLICATIONS.GET_BY_ID(id))
    return response.data
  },

  // Create application (tutor applies to post)
  createApplication: async (postId: string, message?: string): Promise<Application> => {
    const response = await api.post(API_ENDPOINTS.APPLICATIONS.CREATE, { 
      bai_dang_id: postId,
      loi_nhan: message 
    })
    return response.data
  },

  // Update application status (parent accepts/rejects)
  updateApplicationStatus: async (
    id: string,
    status: 'chap_nhan' | 'tu_choi'
  ): Promise<Application> => {
    const response = await api.patch(API_ENDPOINTS.APPLICATIONS.UPDATE_STATUS(id), { status })
    return response.data
  },

  // Get my applications (tutor's applications)
  getMyApplications: async (): Promise<Application[]> => {
    const response = await api.get(API_ENDPOINTS.APPLICATIONS.MY_APPLICATIONS)
    return response.data
  },

  // Get applications by post (parent views who applied)
  getApplicationsByPost: async (postId: string): Promise<Application[]> => {
    const response = await api.get(API_ENDPOINTS.APPLICATIONS.BY_POST(postId))
    return response.data
  },
}
