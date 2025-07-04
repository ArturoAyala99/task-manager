from django.db import models

# Create your models here.
class Tarea(models.Model):
    ESTADOS = [
        ('PEN', 'Pendiente'),
        ('PRO', 'En Progreso'),
        ('COM', 'Completada'),
    ]
      
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()
    estado = models.CharField(
        max_length=3,
        choices=ESTADOS,
        default='PEN',
    )
    creado_en = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.titulo