# Generated by Django 3.2.4 on 2021-08-26 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bleaitpost', '0004_auto_20210827_0116'),
    ]

    operations = [
        migrations.AddField(
            model_name='storemodel',
            name='drawingImage',
            field=models.TextField(null=True),
        ),
    ]