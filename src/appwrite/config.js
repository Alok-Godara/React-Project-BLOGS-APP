import conf from "../conf/conf.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  clint = new Client();
  databases;
  bucket;

  constructor() {
    this.clint.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.clint);
    this.bucket = new Storage(this.clint);
  }

// Database operations for posts

  async createPost({ title, slug, content, featuredimage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredimage: featuredimage,
          status: status,
          userId: userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title: title,
          content: content,
          featuredimage: featuredimage,
          status: status,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error", error);
    }
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
    } catch (error) {
        console.log("Appwrite service :: getPost :: error", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error", error);
      return false;
    }

  }

// File upload and management

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        );
    } catch (error) {
        console.error("Appwrite service :: deleteFile :: error", error);
        return false;
    }
  }

   getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("Appwrite service :: getFilePreview :: error", error);
      return false;
    }
  }

}

const service = new Service();
export default service;