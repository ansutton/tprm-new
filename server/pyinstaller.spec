# -*- mode: python ; coding: utf-8 -*-
import sys ; sys.setrecursionlimit(sys.getrecursionlimit() * 5)


a = Analysis(
    ['app.py'],
    pathex=[],
    binaries=[
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\numpy.libs\\libopenblas64__v0.3.23-293-gc2f4bdbb-gcc_10_3_0-2bde3a66a51006b2b53eb373ff767a3f.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\libomp140.x86_64-342e80c06daee0da2e436795e93b0163.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\libomp-7dc934d99dfa591f473ae5d975972b7c.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\openblas-54c31036ecda6ab8856f9aac9fdee712.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\msvcp140-b9d2f1930e3a04e4b9f88e2514052f10.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\flangrti-5bbaf6aff159e72f9b015d5bc31c7584.dll', '.'),
        ('C:\\Users\\jacwallace\\Repos\\.venv\\Lib\\site-packages\\faiss_cpu.libs\\flang-d38962844214aa9b06fc3989f9adae5b.dll', '.'),
        ],
    datas=[],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    [],
    exclude_binaries=True,
    name='app',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

coll = COLLECT(
    exe,
    a.binaries,
    a.datas,
    strip=False,
    upx=True,
    upx_exclude=[],
    name='tprm_accelerator',
)