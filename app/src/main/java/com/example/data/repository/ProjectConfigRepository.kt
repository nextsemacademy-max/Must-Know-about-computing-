package com.example.data.repository

import com.example.data.local.ProjectConfigDao
import com.example.data.model.ProjectConfig
import kotlinx.coroutines.flow.Flow

class ProjectConfigRepository(private val dao: ProjectConfigDao) {
    val allConfigs: Flow<List<ProjectConfig>> = dao.getAllConfigs()

    suspend fun insert(config: ProjectConfig) {
        dao.insertConfig(config)
    }

    suspend fun delete(config: ProjectConfig) {
        dao.deleteConfig(config)
    }

    suspend fun deleteById(id: Int) {
        dao.deleteById(id)
    }
}
