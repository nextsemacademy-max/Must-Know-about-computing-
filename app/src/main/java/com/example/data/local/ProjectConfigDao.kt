package com.example.data.local

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import com.example.data.model.ProjectConfig
import kotlinx.coroutines.flow.Flow

@Dao
interface ProjectConfigDao {
    @Query("SELECT * FROM project_configs ORDER BY timestamp DESC")
    fun getAllConfigs(): Flow<List<ProjectConfig>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertConfig(config: ProjectConfig)

    @Delete
    suspend fun deleteConfig(config: ProjectConfig)

    @Query("DELETE FROM project_configs WHERE id = :id")
    suspend fun deleteById(id: Int)
}
