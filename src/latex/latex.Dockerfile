FROM archlinux

RUN pacman -Syy
RUN pacman --noconfirm -S \
        pacman-contrib \
        texlive-bin \
        texlive-core \
        texlive-langcyrillic

RUN paccache -r

WORKDIR /data
VOLUME ["/data"]
