/**
 * ============================================
 * POST SERVICE
 * Business logic cho posts
 * ============================================
 */

import { postsApi, applicationsApi } from '@/api'
import type { Post, CreatePostData, PostFilter, Application, PaginatedResponse } from '@/types'

export const postService = {
  // Get posts with filters
  async getPosts(filters: PostFilter): Promise<PaginatedResponse<Post>> {
    try {
      return await postsApi.getPosts(filters)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể tải danh sách bài đăng'
      throw new Error(message)
    }
  },

  // Get post by ID
  async getPostById(id: string): Promise<Post> {
    try {
      return await postsApi.getPostById(id)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không tìm thấy bài đăng'
      throw new Error(message)
    }
  },

  // Create post (parent)
  async createPost(data: CreatePostData): Promise<Post> {
    try {
      return await postsApi.createPost(data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Tạo bài đăng thất bại'
      throw new Error(message)
    }
  },

  // Update post
  async updatePost(id: string, data: Partial<CreatePostData>): Promise<Post> {
    try {
      return await postsApi.updatePost(id, data)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Cập nhật bài đăng thất bại'
      throw new Error(message)
    }
  },

  // Delete post
  async deletePost(id: string): Promise<void> {
    try {
      await postsApi.deletePost(id)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Xóa bài đăng thất bại'
      throw new Error(message)
    }
  },

  // Get my posts
  async getMyPosts(): Promise<Post[]> {
    try {
      return await postsApi.getMyPosts()
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể tải bài đăng của bạn'
      throw new Error(message)
    }
  },
}

export const applicationService = {
  // Apply to post (tutor)
  async applyToPost(postId: string): Promise<Application> {
    try {
      return await applicationsApi.createApplication(postId)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Ứng tuyển thất bại'
      throw new Error(message)
    }
  },

  // Get my applications (tutor)
  async getMyApplications(): Promise<Application[]> {
    try {
      return await applicationsApi.getMyApplications()
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể tải đơn ứng tuyển'
      throw new Error(message)
    }
  },

  // Get applications by post (parent)
  async getApplicationsByPost(postId: string): Promise<Application[]> {
    try {
      return await applicationsApi.getApplicationsByPost(postId)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Không thể tải danh sách ứng tuyển'
      throw new Error(message)
    }
  },

  // Accept/reject application (parent)
  async updateApplicationStatus(
    id: string,
    status: 'chap_nhan' | 'tu_choi'
  ): Promise<Application> {
    try {
      return await applicationsApi.updateApplicationStatus(id, status)
    } catch (error: any) {
      const message = error.response?.data?.message || 'Cập nhật trạng thái thất bại'
      throw new Error(message)
    }
  },
}
